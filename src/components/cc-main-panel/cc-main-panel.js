import { injectStyle } from "../../services/style-injector/style-injector.js"

const template = document.createElement("template")

template.innerHTML = `
    <slot name="messageWindow"></slot>
`

export class CC_MainPanel extends HTMLElement {
    constructor() {
        super()

        this._root = this.attachShadow({ mode: 'closed' })
        injectStyle('src/components/cc-main-panel/cc-main-panel.css', this._root)

        this._root.appendChild(template.content.cloneNode(true))
    }
}

customElements.define('cc-main-panel', CC_MainPanel)