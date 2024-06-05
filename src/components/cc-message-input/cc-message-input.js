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
            <button attach>
                ${icons.attach} 
            </button>
            <input messageText type="text">
            <button send>
                ${icons.send} 
            </button>
        `

        this._root.appendChild(this._wrapper)

        this._attach = this._root.querySelector('[attach]')
        this._send = this._root.querySelector('[send]')
        this._input = this._root.querySelector('[messageText]')

        this._input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this._handleEnterKey(this._input.value)
            }
        })

        this._send.addEventListener('click', () => {
            this._handleEnterKey(this._input.value)
        })
    }

    _handleEnterKey(value) {
        const event = new CustomEvent('messagesended', {
            detail: {
                message: value,
                time: new Date()
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
        this._clear()
    }

    _clear() {
        this._input.value = null
    }
}

customElements.define('cc-message-input', CC_Message_Input)