import {getCurrentUserInfo} from '../services/valueHelper.js'
import { signalRConnection } from '../signalr.js';

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

        this._chattingUserId = 0;
    }


    connectedCallback() {
        const inputField = this.shadowRoot.querySelector('#txtChatInput');
        inputField.addEventListener('keypress', async (event) => {
            if (event.key === 'Enter') {
                const message = {
                    messageText: inputField.value,
                    fromUserId: getCurrentUserInfo(),
                    toUserId: this._chattingUserId,
                    timestamp: new Date()
                };
                await sendChatMessage(message);
                inputField.value = '';
                this.dispatchEvent(new CustomEvent(EVENTS.MESSAGE_SENDED, { detail: message }));
            }
        });
        console.log('selamun aleyküm')
    }

    setChattingUserId(userId) {
        this._chattingUserId = userId;

    }
}

customElements.define('message-input-component', MessageInputComponent);
