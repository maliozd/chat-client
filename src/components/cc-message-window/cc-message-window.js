import { injectStyle } from '../../services/style-injector/style-injector.js'
import { CC_Message_Item } from '../cc-message-item/cc-message-item.js'
import { icons } from '../icons/icons.js'

export class CC_Message_Window extends HTMLElement {
    #scrollDown
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

        this.#scrollDown = document.createElement('button')
        this.#scrollDown.setAttribute('type', 'button')
        this.#scrollDown.setAttribute('scrollDown', '')
        this.#scrollDown.innerHTML = icons.down
    }

    render() {
        if (this._messageData) {
            this._wrapper.innerHTML = null
            let isFinsihed = new Promise(resolve => {
                this._messageData.forEach(value => {
                    let message = document.createElement('cc-message-item')

                    message.data = value
                    message.setAttribute(((value.from === 1) ? 'mine' : 'them'), '')

                    this._wrapper.appendChild(message)
                })
                this._root.append(this._wrapper)
                resolve(this._wrapper)
            })

            isFinsihed.then(resolve => {
                setTimeout(() => {
                    this.scrollToBottom(resolve.scrollHeight)
                }, 1000);
            })

            this._wrapper.appendChild(this.#scrollDown)
            this.#listen()
        }
    }

    #listen() {
        this.#scrollDown.addEventListener('click', () => {
            this.scrollToBottom(this._wrapper.scrollHeight)
        })

        this._root.host.addEventListener('scroll', (e) => {
            let rect = this._wrapper.getBoundingClientRect()
            let much = this._wrapper.offsetHeight - rect.y * -1
            if (much > 1000) {
                this.#scrollDown.setAttribute('show', '')
            } else {
                this.#scrollDown.removeAttribute('show')
            }
        })
    }

    scrollToBottom(height) {
        requestAnimationFrame(() => {
            this._root.host.scrollTo({
                top: height,
                behavior: 'smooth'
            })
        })
    }

    set messageData(value) {
        this._messageData = value
        this.render()
    }

    get messageData() { return this._messageData }

    set addMessage(value) {
        console.log(value);
        let message = document.createElement('cc-message-item')

        message.data = value
        message.setAttribute(((value.from === 1) ? 'mine' : 'them'), '')

        this._wrapper.appendChild(message)

        this.scrollToBottom(this._wrapper.scrollHeight + 500)
    }
}

customElements.define('cc-message-window', CC_Message_Window)