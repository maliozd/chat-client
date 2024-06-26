
import { EVENTS } from '../constants.js';
import { sendChatMessage } from '../services/messageService.js';
import { config } from '../../config.js';
import { getChattingUserId,getCurrentUserId } from '../services/valueHelper.js';

export class MessageInputComponent {
    constructor(container) {
        this.container = container;
    }
    render() {
        const html = `
        <div class="messages__input" id="messageInputContainer">
            <input type="text" id="txtChatInput" selectedUserID="0">
        </div> 
        `;
        this.container.innerHTML += html;
        this.addEventListener();
    }

    addEventListener() {
        const inputField = this.container.querySelector('#txtChatInput');

        var myId = getCurrentUserId();
        inputField.addEventListener('keypress',async (event) => {
            console.log(getChattingUserId());
            if (event.key === 'Enter') {
                const message1 = {
                    Message: inputField.value,
                    FromId: parseInt(myId),
                    ToUserId: parseInt(getChattingUserId()),
                    Timestamp : new Date() 
                };
                await sendChatMessage(message1);
                // const lsMessages = JSON.parse(localStorage.getItem('messages'));
                // lsMessages.push({
                //     messageText: message1.message,
                //     fromName: message1.fromName,
                //     fromId: message1.fromId,
                //     timestamp: new Date().getTime(),
                // });
                // inputField.value = '';
                const customEvent = new CustomEvent(EVENTS.MESSAGE_SENDED);
                this.container.dispatchEvent(customEvent);
            }
        });
    }
}