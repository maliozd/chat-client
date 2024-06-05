import { injectStyle } from "../../services/style-injector/style-injector.js"
import { icons } from "../icons/icons.js"

export class CC_Message_Item extends HTMLElement {
    constructor() {
        super()

        this._params = {
            message: null,
            time: null,
            status: null,
        }

        this._root = this.attachShadow({ mode: 'open' })
        injectStyle('src/components/cc-message-item/cc-message-item.css', this._root)

        this._wrapper = document.createElement('li')
        this._wrapper.className = '__wrapper'
    }

    render() {
        this._wrapper.innerHTML = `
            <span message>
                ${this._params.message}
            </span>
            <button>
                ${icons.more}
            </button>
            <span time>
                ${this._params.date}
            </span>
        `

        this._root.appendChild(this._wrapper)
    }

    set data(value) {
        this._params = value
        this.render()
    }

    get data() { this._params }
}

customElements.define('cc-message-item', CC_Message_Item)