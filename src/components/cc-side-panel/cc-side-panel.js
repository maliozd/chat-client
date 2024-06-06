import { injectStyle } from "../../services/style-injector/style-injector.js"

const template = document.createElement('template')
template.innerHTML = `
    <slot name=userList></slot>
    <slot name=usersTitle></slot>
`

export class CC_SidePanel extends HTMLElement {
    #root
    constructor() {
        super()

        this._root = this.attachShadow({ mode: 'closed' })
        injectStyle('./src/components/cc-side-panel/cc-side-panel.css', this._root)

        this._root.appendChild(template.content.cloneNode(true))
    }
}

customElements.define('cc-side-panel', CC_SidePanel)