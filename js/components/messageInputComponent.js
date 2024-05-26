
import { EVENTS } from '../constants.js';
export class MessageInputComponent {
    constructor(container) {
        this.container = container;
    }
    render() {
        const html = `
        <div class="messages__input" id="messageInputContainer">
            <input type="text" id="txtChatInput">
        </div> 
        `;
        this.container.innerHTML += html;
        this.addEventListener();
    }

    addEventListener(callback) {
        const inputField = this.container.querySelector('#txtChatInput');
        inputField.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                callback(inputField.value);
                inputField.value = '';
            }
        });
    }
}