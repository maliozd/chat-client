import { getCurrentUserInfo } from '../services/valueHelper.js'
import { EVENTS } from '../constants.js';
import { sendChatMessage } from '../services/messageService.js';

class MessageInputComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            .messages__input {
                display: flex;
                padding: 10px;
                border-top: 1px solid #ddd;
                background-color: #f9f9f9;
            }
            #txtChatInput {
                flex: 1;
                padding: 10px;
                margin: 5px;
                border-radius: 5px;
                border: 1px solid #ccc;
            }
            button {
                padding: 10px 20px;
                margin: 5px;
                border-radius: 5px;
                background-color: #007bff;
                color: #fff;
                border: none;
                cursor: pointer;
            }
            button:hover {
                background-color: #0056b3;
            }
        </style>
        <div class="messages__input" id="messageInputContainer">
            <input type="text" id="txtChatInput" placeholder="Type a message...">
            <button id="sendMessageButton">Send</button>
        </div>
    `;

        this._activeUserId = 0; //last 
    }


    connectedCallback() {
        const inputField = this.shadowRoot.querySelector('#txtChatInput');
        inputField.addEventListener('keypress', async (event) => {
            if (event.key === 'Enter') {
                const message = {
                    messageText: inputField.value,
                    fromUserId: parseInt(getCurrentUserInfo().id),
                    toUserId: parseInt(this._activeUserId),
                    timestamp: new Date()
                };
                // console.log(message);
                await sendChatMessage(message);
                inputField.value = '';
                this.dispatchEvent(new CustomEvent(EVENTS.MESSAGE_SENDED, {
                    detail: message,
                    composed: true,
                    bubbles: true,
                    cancelable: false
                }));
            }
        });
    }
    set activeUserId(value) {
        this._activeUserId = value;
    }

    get activeUserId() {
        return this._activeUserId;
    }

}
customElements.define('message-input-component', MessageInputComponent);
