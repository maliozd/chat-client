import { injectStyle } from "../../services/style-injector/style-injector.js"
import { icons } from '../icons/icons.js'

export class CC_User_Item extends HTMLElement {
    #params
    #root
    #internals
    #wrapper
    constructor() {
        super()

        this.#params = {
            name: null,
            image: null,
            lastSeen: null,
            lastMessage: null,
            status: null,
        }

        this.#root = this.attachShadow({ mode: 'open' })
        injectStyle('src/components/cc-user-item/cc-user-item.css', this.#root)

        this.#internals = this.attachInternals()

        this.#wrapper = document.createElement("div")
        this.#wrapper.className = '__wrapper'
    }

    #render() {
        this.#wrapper.innerHTML = `
            <image src=${this.#params.image}>
            <div>
                <h2>${this.#params.name}</h2>
                <span>${this.#params.lastMessage}</span>
            </div>
            <button>
                ${icons.more}
            </button>
        `

        this.#root.appendChild(this.#wrapper)
    }

    set params(value) {
        this.#params = value

        this.#render()
    }

    get params() { return this.#params }

    set current(flag) {
        if (flag) {
            this.#internals.states.add('selected')
        } else {
            this.#internals.states.delete('selected')
        }
    }
}

customElements.define('cc-user-item', CC_User_Item)