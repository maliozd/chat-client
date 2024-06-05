import { injectStyle } from "../../services/style-injector/style-injector.js"

const template = document.createElement("template")

template.innerHTML = `
    <slot name="sidePanel"></slot>
    <slot name="mainPanel"></slot>
`

export class ChatClient extends HTMLElement {
    constructor() {
        super()

        this._root = this.attachShadow({ mode: 'open' })
        this._root.appendChild(template.content.cloneNode(true))

        injectStyle('src/components/chat-client/chat-client.css', this._root)
    }
}

customElements.define('chat-client', ChatClient)