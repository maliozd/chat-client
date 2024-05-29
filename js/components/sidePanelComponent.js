import  activeUserInstance  from '../states/activeUserStateManager.js';
import { EVENTS } from '../constants.js'
class SidePanelComponent extends HTMLElement {
  constructor(lastChattingUserId) { //bunu sonradan yapacağım
    super();
    const template = document.createElement('template');
    template.innerHTML = `
        <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 250px;
          background-color: #f0f0f0;
          border-right: 1px solid #ddd;
          padding: 20px;
        }

        .search-bar {
          display: flex;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ddd;
          margin-bottom: 20px;
        }

        .search-bar input {
          flex: 1;
          padding: 5px;
          border: none;
          outline: none;
        }

        .user-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .user-list li {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .user-list li:hover {
          background-color: #38bce848;
        }

        .user-list img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .user-list span {
          font-size: 16px;
        }
        .user-list .active {
          background-color: #20bcf0a0;
          transition: 0.6s;

        }
        .user-list .active:hover {
          background-color: #20bcf0a0;
          // 38bce848
          // 20bcf0a0
        }
      </style>

      <div class="search-bar">
        <input type="text" placeholder="Kullanıcı Ara">
      </div>

      <ul class="user-list">
       
        </ul>
    
        `;
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    this._data = [];
    this._activeChattingUserId = activeUserInstance.activeUserId;
  }

  connectedCallback() {
    this.render();
    window.addEventListener(EVENTS.ACTIVE_USER_CHAT_CHANGED, this.handleActiveUserChange.bind(this));
  }
  disconnectedCallBack() {
    window.addEventListener(EVENTS.ACTIVE_USER_CHAT_CHANGED, this.handleActiveUserChange.bind(this));

  }
  set data(value) {
      this._data = value;
      this.render();
  }

  get data() {
    return this._data;
  }


  render() {
    if (!this.shadowRoot) return;
    // console.log("active user id from render func : ", this._activeChattingUserId);
    const usersContainer = this.shadowRoot.querySelector('.user-list');
    usersContainer.innerHTML = this._data.map(user => `
            <li class="${this._activeChattingUserId == user.id ? "user active" : "user"}" data-user-id="${user.id}">
                <div class="user__picture">
                    <img src="https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg" alt="${user.username}">
                </div>
                <div class="user__name">${user.username}</div>
                <div class="user__latestMessage">${user.latestMessage ? user.latestMessage.messageText : ""}</div>
            </li>
        `).join('');


    this.addEventListeners();
  }

  addEventListeners() {
    const userElements = this.shadowRoot.querySelectorAll('.user');
    userElements.forEach(element => {
      element.addEventListener('click', (e) => {
        const userId = element.dataset.userId;
        activeUserInstance.activeUserId = userId;
      });
    });
  }


  handleActiveUserChange(event) {
    const { activeUserId } = event.detail;
    this._activeChattingUserId = activeUserId;
    this.render();
  }


}

customElements.define('side-panel-component', SidePanelComponent);
