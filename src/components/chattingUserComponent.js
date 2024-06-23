import { RECEIVE_FUNCTION_NAMES } from '../constants.js';
import { signalRConnection } from '../signalr.js';
class ChattingUserComponent extends HTMLElement {
  constructor() {
    super();
    try {
      this.attachShadow({ mode: 'open' });

      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ddd;
          background-color: #f0f0f0;
        }
  
        .profile-container {
          position: relative;
          margin:5px 5px;
          padding: 5px;
        }

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: absolute;
          bottom: 0;
          border: 2px solid white;
        }

        .status-active {
          background-color: green;
        }

        .status-away {
          background-color: yellow;
        }

        .status-busy {
          background-color: red;
        }

        .status-offline {
          background-color: gray;
        }
  
        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-info span {
          font-size: 16px;
          font-weight: bold;
        }

        .last-seen {
          font-size: 12px;
          margin-top: 5px;
          color: #999;
        }
      </style>
  
      <div class="profile-container">
        <img src="https://picsum.photos/200" alt="Kullanıcı Profil Resmi">
        <div class="status-indicator"></div>
      </div>
      <div class="user-info">
        <span class="user_name">Kullanıcı Adı</span>
        <small class="last-seen"></small>
      </div>
    `;
      this._data = {};
      this._handleUserOnlineStatusChanged = this._handleUserOnlineStatusChanged.bind(this);
      window.addEventListener('userOnlineStatusChanged', this._handleUserOnlineStatusChanged);
    } catch (error) {
      console.error(error);
    }
  }

  static get observedAttributes() {
    return ['data'];
  }

  set data(user) {
    this._data = user;
    this.render();
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    console.log('selamun aleyküm')
    this.render();
  }

  _handleUserOnlineStatusChanged(event) {
    const { userId, status } = event.detail;
    console.log(event);
    if (parseInt(userId) === parseInt(this._data.id)) {
      console.log(event);
      this.shadowRoot.querySelector('.last-seen').textContent = status ? 'Online' : this.formatLastSeen(this._data.lastSeen);
      console.log(`Chatting user id : ${this._data.id}`, `Status changed user id : ${userId}`);
    }
  }

  disconnectedCallback() {
    console.log("chatting user component disconnected from dom");
  }

  attributeChangedCallback() {
    this.render();
  }

  formatLastSeen(lastSeen) {
    if (lastSeen == null)
      return 'Last seen : Unknown';
    const lastSeenDate = new Date(lastSeen);
    const now = new Date();

    const isToday = lastSeenDate.toDateString() === now.toDateString();
    const isYesterday = lastSeenDate.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();

    if (isToday) {
      return `Last seen: Today at ${lastSeenDate.getHours()}:${String(lastSeenDate.getMinutes()).padStart(2, '0')}`;
    } 
    else if (isYesterday){
      return `Last seen: Yesterday at ${lastSeenDate.getHours()}:${String(lastSeenDate.getMinutes()).padStart(2, '0')}`;
    }
    else {
      return `Last seen: ${lastSeenDate.toDateString()}`;
    }
  }

  render() {
    if (this._data) {
      this.shadowRoot.querySelector('.user_name').textContent = this._data.username || 'Kullanıcı Adı';
      this.shadowRoot.querySelector('.last-seen').textContent = this.formatLastSeen(this._data.lastSeen);
      const statusIndicator = this.shadowRoot.querySelector('.status-indicator');
      statusIndicator.className = 'status-indicator ' + (this._data.status || 'status-active');
    }
  }

}

customElements.define('chatting-user-component', ChattingUserComponent);