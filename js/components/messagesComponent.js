import { getCurrentUserId } from "../services/valueHelper.js";

export class MessagesComponent {
    constructor(container, messages) {
        this.container = container
        this.data = messages;
        this.activeUserId = getCurrentUserId();
    }

    render() {
        const messagesHtml = `
            ${this.data.map(message =>
            `<li class="message" style="align-self: ${this.activeUserId == message.fromUserId ? 'flex-end' : 'flex-start'}">
                    ${message.messageText}
                </li>`
        ).join('')}
            `;

        this.container.innerHTML = '';
        this.container.innerHTML += messagesHtml;

        // requestAnimationFrame(() => this.scrollToBottom())
        setTimeout(() => this.scrollToBottom(), 0);
    }

    scrollToBottom() {
        this.container.scrollToBottom = this.container.scrollHeight;
    }
}

