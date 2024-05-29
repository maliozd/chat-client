class SidePanelComponent extends HTMLElement {
    constructor() {
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
          background-color: #eee;
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
      </style>

      <div class="search-bar">
        <input type="text" placeholder="Kullanıcı Ara">
      </div>

      <ul class="user-list">
       
        </ul>
    
        `;
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
        this._data = [];
        this._currentUserId = null;
    }

    connectedCallback() {
        this.render();
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

    set currentUserId(value) {
        if (this._currentUserId !== value) {
            this._currentUserId = value;
            this.render();
        }
    }

    get currentUserId() {
        return this._currentUserId;
    }

    render() {
        if (!this.shadowRoot) return;
        const usersContainer = this.shadowRoot.querySelector('.user-list');
        console.log(usersContainer)
        console.log(this._data);
        usersContainer.innerHTML = this._data.map(user => `
            <li class="user" data-user-id="${user.id}">
                <div class="user__picture">
                    <img src="https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg" alt="${user.username}">
                </div>
                <div class="user__name">${user.username}</div>
                <div class="user__latestMessage">${user.latestMessage ? user.latestMessage.messageText : ""}</div>
            </li>
        `).join('');

        const postUser = this._data.find(user => user.id === this._currentUserId);
        const profilePic = this.shadowRoot.querySelector('.profile-pic');
        if (postUser) {
            profilePic.src = "https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg";
        }
        this.addEventListeners();
    }

    addEventListeners() {
        const userElements = this.shadowRoot.querySelectorAll('.user');
        userElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const userId = element.dataset.userId;
                const customEvent = new CustomEvent('USER_CHAT_SELECTED', { detail: { userId } });
                this.dispatchEvent(customEvent);
            });
        });
    }

    loadExternalCSS(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        this.shadowRoot.appendChild(link);
    }
}

customElements.define('side-panel-component', SidePanelComponent);
