export class MessagesComponent {
    constructor(container, messages,activeUserId) {
        this.container = container
        this.data = messages;
        this.activeUserId =  activeUserId;
    }
   
    render() {
        const messagesHtml = `<ul class="messages__list">
            ${this.data.map(message => 
                `<li class="message" style="align-self: ${this.activeUserId == message.fromId ? 'flex-end' : 'flex-start'}">
                    ${message.messageText}
                </li>`
            ).join('')}
        </ul>`;

        this.container.innerHTML += messagesHtml;
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.container.scrollTop = this.container.scrollHeight;
    }
}

