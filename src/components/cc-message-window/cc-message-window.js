import { staticValues } from '../static.js'
import { injectStyle } from '../../services/style-injector/style-injector.js'

export class CC_Message_Window extends HTMLElement {
    constructor() {
        super()

        this._messageData = null

        this._htmlElements = {
            wrapper: document.createElement('ul'),
            message: document.createElement('li'),
            date: document.createElement('span'),
            status: document.createElement('div'),
        }

        this._root = this.attachShadow({ mode: 'open' })

        injectStyle('./../src/components/cc-message-window/cc-message-window.css', this._root)
    }

    createMessageElement(value) {
        let dummy = this._htmlElements.message.cloneNode(true)

        dummy.setAttribute(`${(staticValues.currentUserId === value.from) ? 'mine' : 'them'}`, '')

        dummy.textContent = value.message

        this._htmlElements.wrapper.appendChild(dummy)
    }

    render() {
        if (this._messageData) {
            this._htmlElements.wrapper.innerHTML = null

            this._messageData.forEach(value => {
                this.createMessageElement(value)
            })

            this._root.append(this._htmlElements.wrapper)
        }
    }

    set messageData(value) {
        this._messageData = value
        this.render()
    }

    get messageData() { this._messageData }
}

customElements.define('cc-message-window', CC_Message_Window)