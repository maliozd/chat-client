class MessagesComponent extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
        :host {
            flex: 1;
            overflow-y: scroll;
            padding: 20px;
          }
          
          .message {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
          }
          
          .message.self {
            flex-direction: row-reverse;
          }
          
          .message p {
            padding: 10px;
            border-radius: 5px;
            background-color: #fff;
            max-width: 80%;
            margin: 0 5px;
          }
          
          .message.self p {
            background-color: #ddd;
          }
          
          .message img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          </style>
          
          <div class="messages"></div>
          `;
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    this._data = [];
  }

  set data(value) {
    if (JSON.stringify(this._data) !== JSON.stringify(value)) {
      this._data = value;
      this.render();
    }
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    this.render();
  }

  /**
   * @param {any[]} value
   */
  set data(value) {
    if (JSON.stringify(this._data) !== JSON.stringify(value)) {
      this._data = value;
      this.render();
    }
  }

  render() {
    const messagesList = this.shadowRoot.querySelector('.messages');
    messagesList.innerHTML = this._messages.map(message =>
      `<li class="message ${message.fromUserId === getCurrentUserId() ? 'self' : 'other'}">
                ${message.messageText}
            </li>`
    ).join('');
    this.scrollToBottom();
  }

  addNewMessage(messageData) {
    this._messages.push(messageData);
    this.render();
  }

  scrollToBottom() {
    const messagesList = this.shadowRoot.querySelector('.messages__list');
    messagesList.scrollTop = messagesList.scrollHeight;
  }
}

customElements.define('messages-component', MessagesComponent);
