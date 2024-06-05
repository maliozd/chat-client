import { injectStyle } from '../../services/style-injector/style-injector.js'
import { icons } from '../icons/icons.js'

export class CC_Message_Input extends HTMLElement {
    constructor() {
        super()

        this._root = this.attachShadow({ mode: 'open' })
        injectStyle('src/components/cc-message-input/cc-message-input.css', this._root)

        this._wrapper = document.createElement('div')
        this._wrapper.className = '__wrapper'

        this._wrapper.innerHTML = `
            <input>
            <button>
                ${icons.send} 
            </button>
        `

        this._root.appendChild(this._wrapper)
    }
}

customElements.define('cc-message-input', CC_Message_Input)