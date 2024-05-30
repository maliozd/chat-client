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
      <span class="user_name">Kullanıcı Adı</span>
    `;
      this._data = [];
    } catch (error) {
      console.error(error);

    }
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
    console.log("chatting user component diconnected from dom ");

  }
  attributeChangedCallback() {
    console.log("selamun aleyküm")
  }
  render() {
    const messagesList = this.shadowRoot.querySelector('#chat-main');
    this.shadowRoot.querySelector('.user_name').innerHTML = 'Mehmet Ali';

  }

}

customElements.define('chatting-user-component', ChattingUserComponent);