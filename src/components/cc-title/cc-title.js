import { injectStyle } from "../../services/style-injector/style-injector.js"

export class CC_Title extends HTMLElement {
    constructor() {
        super()

        this._root = this.attachShadow({ mode: "open" })
    }
}

customElements.define("cc-title", CC_Title)