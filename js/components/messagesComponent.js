import activeUserInstance from '../states/activeUserStateManager.js';
import { EVENTS } from '../constants.js';
import { getUserMessagesById } from '../services/messageService.js';
import { getCurrentUserInfo } from '../services/valueHelper.js';
class MessagesComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    console.log("messages comp ctor")

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
    console.log("messages component value : ", value);
    
    this._data = value;
    this.render();
  }
  
  get data() {
    return this._data;
  }
  
  connectedCallback() {
    this.render(); 
    // window.addEventListener(EVENTS.ACTIVE_USER_CHAT_CHANGED, (e) => {
    //   console.log(e);
    // });
    console.log("selamun aleyküm")
  }

  disconnectedCallback() {
    console.log('disconnected');
  }
  
  async handleActiveUserChange(event) {
    console.log(event);
    const { activeUserId } = event.detail;
    const messages = await getUserMessagesById(activeUserId); // Asenkron olarak kullanıcı mesajlarını alıyoruz
    this.data = messages;
  }

  render() {
    console.log("rendering messages");
    const messagesList = this.shadowRoot.querySelector('.messages');
    messagesList.innerHTML = this._data.map(message =>
      `<div class="message ${message.fromUserId === this._userId ? 'self' : 'other'}">
        <img src="https://via.placeholder.com/40" alt="User Image">
        <p>${message.messageText}</p>
      </div>`
    ).join('');
    this.scrollToBottom();
    window.removeEventListener(EVENTS.ACTIVE_USER_CHAT_CHANGED, handleActiveUserChange);
    window.addEventListener(EVENTS.ACTIVE_USER_CHAT_CHANGED, (e) => {
      console.log(e);
    });
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
