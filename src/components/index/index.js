import { injectStyle } from "../../services/style-injector/style-injector.js";

import { ChatClient } from "../chat-client/chat-client.js";
import { CC_SidePanel } from '../cc-side-panel/cc-side-panel.js'
import { CC_User_List } from "../cc-user-list/cc-user-list.js";
import { CC_MainPanel } from '../cc-main-panel/cc-main-panel.js'
import { CC_Message_Window } from "../cc-message-window/cc-message-window.js";
import { CC_Message_Input } from "../cc-message-input/cc-message-input.js";
import { CC_Title } from "../cc-title/cc-title.js";

import { messageData } from '../messageData.js'
import { usersData } from '../userData.js'

injectStyle('src/components/index/index.css', document.head)

const customElements = {
    CC_Message_Window: document.querySelector('cc-message-window'),
    CC_User_List: document.querySelector('cc-user-list'),
    CC_Message_Input: document.querySelector('cc-message-input'),
    CC_Title: document.querySelector('cc-title'),
    CC_Title2: document.querySelector('cc-title2'),
}

customElements.CC_Message_Window.messageData = messageData
customElements.CC_User_List.userData = usersData

console.log(customElements.CC_Title2);
customElements.CC_Title2.userData = usersData[1]


customElements.CC_Message_Input.addEventListener('messagesended', e => {
    console.log(e.detail);
})