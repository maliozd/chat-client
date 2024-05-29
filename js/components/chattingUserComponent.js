class ChattingUserComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }

        span {
          font-size: 16px;
          font-weight: bold;
        }
      </style>

      <img src="https://picsum.photos/200" alt="Kullanıcı Profil Resmi">
      <span>Kullanıcı Adı</span>
    `;
  }
}

customElements.define('chatting-user-component', ChattingUserComponent);
