import { injectStyle } from "../../services/style-injector/style-injector.js";

import { ChatClient } from "../chat-client/chat-client.js";
import { CC_SidePanel } from '../cc-side-panel/cc-side-panel.js'
import { CC_MainPanel } from '../cc-main-panel/cc-main-panel.js'
import { CC_Message_Window } from "../cc-message-window/cc-message-window.js";

import { messageData } from '../messageData.js'

injectStyle('src/components/index/index.css', document.head)

const customElements = {
    CC_Message_Window: document.querySelector('cc-message-window')
}

customElements.CC_Message_Window.messageData = messageData