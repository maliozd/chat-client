class MessageInputComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .messages__input {
                    display: flex;
                }
                #txtChatInput {
                    flex: 1;
                    padding: 10px;
                    margin: 5px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
            </style>
            <div class="messages__input" id="messageInputContainer">
                <input type="text" id="txtChatInput" placeholder="Type a message...">
            </div>
        `;
    }

    connectedCallback() {
        const inputField = this.shadowRoot.querySelector('#txtChatInput');
        inputField.addEventListener('keypress', async (event) => {
            if (event.key === 'Enter') {
                const message = {
                    messageText: inputField.value,
                    fromUserId: getCurrentUserId(),
                    toUserId: getChattingUserId(),
                    timestamp: new Date()
                };
                await sendChatMessage(message);
                inputField.value = '';
                this.dispatchEvent(new CustomEvent(EVENTS.MESSAGE_SENDED, { detail: message }));
            }
        });
    }
}

customElements.define('message-input-component', MessageInputComponent);
