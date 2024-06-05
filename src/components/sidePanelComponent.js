import { EVENTS } from '../constants.js'
class SidePanelComponent extends HTMLElement {
  constructor(lastChattingUserId) { //bunu sonradan yapacağım
    super();
    this.attachShadow({ mode: 'open' })

    console.log("selamun aleyküm");
    this.shadowRoot.innerHTML = `
    <style>
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 250px;
      background-color: #f0f0f0;
      border-right: 1px solid #ddd;
    }

    .search-bar {
      display: flex;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #ddd;
    }

    .search-bar input {
      flex: 1;
      padding: 5px;
      border: none;
      outline: none;
    }

    .user {

    }

    .user-list {
      flex: 1;
      list-style: none;
      padding: 0;
      margin: 0;
      overflow-y: auto;
    }

    .user-list li {
      display: flex;
      align-items: center;
      padding: 10px;
      transition: background-color 0.2s ease;
    }

    .user-list li:hover {
      background-color: #79e0f0b8;
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
      background-color: #38bce848;
    }
    .user-list li .active {
      background-color: #71e0f1;

    }
    .qwerty {
      display: flex;
      flex-direction : column;
      gap:5px;

    }
  </style>

  <div class="search-bar">
    <input type="text" placeholder="Kullanıcı Ara">
  </div>

  <ul class="user-list"></ul>

  <side-panel-footer-component></side-panel-footer-component>
`;
    this._data = [];
  }

  connectedCallback() {
    this.render();
  }
  disconnectedCallBack() {

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
                <div class="qwerty">
                  <div class="user__name">${user.username}</div>
                  <div class="user__latestMessage">${user.latestMessage ? user.latestMessage.messageText : ""}</div>
                </div>
            </li>
        `).join('');

    this.addEventListeners();
  }

  addEventListeners() {
    const userElements = this.shadowRoot.querySelectorAll('.user');
    userElements.forEach(element => {
      element.addEventListener('click', (e) => {
        this.setActiveElement(element)
        this.dispatchUserChangedEvent(element);
      });
    });
  }

  setActiveElement(element) {
    if (this.shadowRoot.querySelector('.active')) {
      this.shadowRoot.querySelector('.active').classList.remove('active');
    }
    element.classList.add('active');
  }

  dispatchUserChangedEvent(element) {
    const userId = element.dataset.userId;
    if (userId == this._activeChattingUserId)
      return;
    this._activeChattingUserId = userId;
    let event = new CustomEvent(EVENTS.ACTIVE_USER_CHAT_CHANGED, {
      detail: {
        activeUserId: this._activeChattingUserId,
      },
      bubbles: true,
      cancelable: false,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}
customElements.define('side-panel-component', SidePanelComponent);