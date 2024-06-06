import { injectStyle } from '../../services/style-injector/style-injector.js'
import { icons } from '../icons/icons.js'

export class CC_Message_Input extends HTMLElement {
    #wrapper
    #sendButton
    #inputField
    #root

    constructor() {

        super()

        this.#root = this.attachShadow({ mode: 'open' })

        this.#initComponent()
        this.#eventListener()
    }

    #initComponent() {
        injectStyle('src/components/cc-message-input/cc-message-input.css', this.shadowRoot)

        this.#wrapper = document.createElement('div')
        this.#wrapper.className = '__wrapper'

        this.#wrapper.innerHTML = `
            <button attach>
                ${icons.attach} 
            </button>
            <input messageText type="text">
            <button type="button" send>
                ${icons.send} 
            </button>
        `

        this.#root.appendChild(this.#wrapper)

        this.#sendButton = this.#root.querySelector('[send]')
        this.#inputField = this.#root.querySelector('[messageText]')
    }

    #eventListener() {
        this.#inputField.addEventListener('keydown', this.#debounce((e) => {
            if (e.key === 'Enter') {
                this.#handleMessageSend(this.#inputField.value);
            }
        }, 100))

        this.#sendButton.addEventListener('click', () => {
            this.#handleMessageSend(this.#inputField.value)
        })
    }

    #handleMessageSend(value) {
        const event = new CustomEvent('messagesended', {
            detail: {
                message: value,
                time: new Date()
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
        this.#clear()
    }

    #clear() {
        this.#inputField.value = null
    }

    #debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
}

customElements.define('cc-message-input', CC_Message_Input)