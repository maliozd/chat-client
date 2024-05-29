import { EVENTS } from "../constants.js";

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
      this._data.activeUserId = id;
    this._notifyChange();
}
  
  _notifyChange() {
  const event = new CustomEvent(EVENTS.ACTIVE_USER_CHAT_CHANGED, {
      detail: {
          activeUserId: this._data.activeUserId,
        }, 
    });
    console.log(window)
      window.dispatchEvent(event);
    }
  }
  
const activeUserInstance = new ActiveUserStateManager();
Object.freeze(activeUserInstance); //make immutable 

export default activeUserInstance;
  