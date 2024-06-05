import { injectStyle } from '../../services/style-injector/style-injector.js'
import { CC_Message_Item } from '../cc-message-item/cc-message-item.js'

export class CC_Message_Window extends HTMLElement {
    constructor() {
        super()

        this._messageData = null

        this._htmlElements = {
            date: document.createElement('span'),
            status: document.createElement('div'),
        }

        this._root = this.attachShadow({ mode: 'open' })
        this._wrapper = document.createElement('ul')
        this._wrapper.className = '__wrapper'

        injectStyle('./../src/components/cc-message-window/cc-message-window.css', this._root)
    }

    render() {
        if (this._messageData) {
            this._messageData.forEach(value => {
                let message = document.createElement('cc-message-item')

                message.data = value
                message.setAttribute(((value.from === 1) ? 'mine' : 'them'), '')

                this._wrapper.appendChild(message)
            })

            this._root.append(this._wrapper)
        }
    }

    set messageData(value) {
        this._messageData = value
        this.render()
    }

    get messageData() { this._messageData }
}

customElements.define('cc-message-window', CC_Message_Window)