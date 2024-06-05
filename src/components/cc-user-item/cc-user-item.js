import { injectStyle } from "../../services/style-injector/style-injector.js"

export class CC_User_Item extends HTMLElement {
    constructor() {
        super()

        this._params = {
            name: null,
            image: null,
            lastSeen: null,
            lastMessage: null,
            status: null,
        }

        this._root = this.attachShadow({ mode: 'open' })
        injectStyle('src/components/cc-user-item/cc-user-item.css', this._root)

        this._internals = this.attachInternals()

        this._wrapper = document.createElement("div")
        this._wrapper.className = '__wrapper'
    }

    render() {
        this._wrapper.innerHTML = `
            <image src=${this._params.image}>
            <div>
                <h2>${this._params.name}</h2>
                <span>${this._params.lastMessage}</span>
            </div>
        `

        this._root.appendChild(this._wrapper)
    }

    set params(value) {
        this._params = value

        this.render()
    }

    get params() { return this._params }

    set current(flag) {
        if (flag) {
            this._internals.states.add('selected')
        } else {
            this._internals.states.delete('selected')
        }
    }
}

customElements.define('cc-user-item', CC_User_Item)