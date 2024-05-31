import { EVENTS } from "../constants.js";

//actively chatting user state 
//aktif olarak chatleşilen kullanıcı state manager

class ActiveUserStateManager {
  _data;
  static instance;

  constructor() {
    if (!ActiveUserStateManager.instance) {
      this._data = {
        activeUserId: null,
      };
      ActiveUserStateManager.instance = this;
    }

    return ActiveUserStateManager.instance;
  }

  get activeUserId() {
    return this._data.activeUserId;
  }

  set activeUserId(id) {
    if (this._data.activeUserId == id)
      return;
    this._data.activeUserId = id;
    this._notifyChange();
  }

  _notifyChange() {
    console.log("motifying..")
    const event = new CustomEvent(EVENTS.ACTIVE_USER_CHAT_CHANGED, {
      detail: {
        activeUserId: this._data.activeUserId,
      },
      bubbles: true,
      cancelable: false,
      composed: true,
    });
    console.log(window);
    document.getElementById('chat-app').dispatchEvent(event);
  }
}
const activeUserInstance = new ActiveUserStateManager();
Object.freeze(activeUserInstance); //make immutable 

export default activeUserInstance;
