class SidePanelFooterComponent extends HTMLElement {
    constructor() {
      super();
      try {
        this.attachShadow({ mode: 'open' });
  
        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            flex-direction: column;
            padding: 10px;
            border-top: 1px solid #ddd;
            margin-top: auto;
          }
    
          .menu-item {
            display: flex;
            align-items: center;
            padding: 10px;
            transition: background-color 0.2s ease;
          }
  
          .menu-item:hover {
      background-color: #79e0f0b8;

          }
  
          .menu-item img {
            width: 26px;
            height: 26px;
            margin-right: 10px;
            border-radius : 50px
          }
  
          .menu-item span {
            font-size: 16px;
          }
        </style>
        <div class="menu-item">
          <img src="icons/settings.svg" alt="Settings">
          <span>Settings</span>
        </div>
        <div class="menu-item">
          <img src="https://picsum.photos/200" alt="Profile">
          <span>Profile</span>
        </div>
      `;
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  customElements.define('side-panel-footer-component', SidePanelFooterComponent);
//   <div class="menu-item">
//         //   <img src="icons/starred.svg" alt="Starred messages">
//         //   <span>Starred messages</span>
//         // </div>
//         // <div class="menu-item">
//         //   <img src="icons/archive.svg" alt="Archived chats">
//         //   <span>Archived chats</span>
//         // </div>