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
        <small class="last-seen">Last seen: 2 hours ago</small>
      </div>
    `;
      this._data = {};
    } catch (error) {
      console.error(error);
    }
  }

  static get observedAttributes() {
    return ['data'];
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
    console.log('selamun aleyküm')
    this.render();
  }

  disconnectedCallback() {
    console.log("chatting user component disconnected from dom");
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (this._data) {
      this.shadowRoot.querySelector('.user_name').textContent = this._data.username || 'Kullanıcı Adı';
      this.shadowRoot.querySelector('.last-seen').textContent = `Last seen: ${this._data.lastSeen || 'unknown'}`;
      const statusIndicator = this.shadowRoot.querySelector('.status-indicator');
      statusIndicator.className = 'status-indicator ' + (this._data.status || 'status-active');
    }
  }
  
}

customElements.define('chatting-user-component', ChattingUserComponent);