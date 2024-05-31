import activeUserInstance from '../states/activeUserStateManager.js';
import { EVENTS } from '../constants.js';
import { getUserMessagesById } from '../services/messageService.js';
import { getCurrentUserInfo } from '../services/valueHelper.js';
class MessagesComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    console.log("selamun aleyküm")

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
    console.log("selamun aleyküm")
  }

  disconnectedCallback() {
    console.log('disconnected');
  }
  

  render() {
    console.log("rendering messages...");
    const messagesList = this.shadowRoot.querySelector('.messages');
    messagesList.innerHTML = this._data.map(message =>
      `<div class="message ${message.fromUserId === this._userId ? 'self' : 'other'}">
        <img src="https://via.placeholder.com/40" alt="User Image">
        <p>${message.messageText}</p>
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
    messagesList.scrollTop = messagesList.scrollHeight;
  }
}

customElements.define('message-list-component', MessagesComponent);
