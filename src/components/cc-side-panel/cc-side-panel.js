import { injectStyle } from "../../services/style-injector/style-injector.js"

const template = document.createElement('template')
template.innerHTML = ''

export class CC_SidePanel extends HTMLElement {
    constructor() {
        super()

        this._root = this.attachShadow({ mode: 'closed' })
        injectStyle('./src/components/cc-side-panel/cc-side-panel.css', this._root)
    }
}

customElements.define('cc-side-panel', CC_SidePanel)