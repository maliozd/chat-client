import { getCurrentUserInfo } from '../services/valueHelper.js';
import { signalRConnection } from '../signalr.js';
import { RECEIVE_FUNCTION_NAMES } from '../constants.js';

class MessagesComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
<style>
:host {
    flex: 1;
    overflow-y: scroll;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  
  .message {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    margin:25px 10px;
    border-radius : 1000px!important;
  }


  .message-self {
    align-items: flex-end;
    justify-content: end;
  }

  .message-other {
    align-items: flex-start;
  }
  .message-content {
    padding: 18px;
    border-radius: 5px;
    background-color: #fff;
    max-width: 80%;
    position: relative;
    display: inline-block;
    word-wrap: break-word;
    font-size:20px;
  }


  .timestamp {
    font-size: 10px;
    color: #999;
    position: absolute;
    bottom: -15px;
    right: 0;
    text-wrap: nowrap;
  }

  .status-icon {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    bottom: -15px;
    left: 0;
  }

  .status-read {
    background-color: blue;
  }

  .status-unread {
    background-color: gray;
  }

</style>
  
  <div class="messages"></div>
  `;
    this._data = [];
    this._userId = getCurrentUserInfo().id;

  }

  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    this.render();

  }

  disconnectedCallback() {
  }

  render() {
    if (getCurrentUserInfo())
      this._userId = getCurrentUserInfo().id;
    const messagesList = this.shadowRoot.querySelector('.messages');
    messagesList.innerHTML = '';
    if (!this._data)
      return;
    messagesList.innerHTML = this._data.map(message =>
      `<div class="message message-${parseInt(message.fromUserId) == parseInt(this._userId) ? 'self' : 'other'}">
        <div class="message-content">
          ${message.messageText}
          <span class="timestamp">${new Date(message.timestamp).toLocaleString()}</span>
          <span class="status-icon ${message.isRead ? 'status-read' : 'status-unread'}"></span>
        </div>
      </div>`
    ).join('');
    this.scrollToBottom();
  }

  addNewMessage(messageData) {
    this._data.push(messageData);
    this.render();
  }

  scrollToBottom() {
    const messagesList = this.shadowRoot.querySelector('.messages');
    messagesList.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    // messagesList.scrollTop = messagesList.scrollHeight;
  }
}

customElements.define('message-list-component', MessagesComponent);
// <img src="https://via.placeholder.com/40" alt="User Image">
