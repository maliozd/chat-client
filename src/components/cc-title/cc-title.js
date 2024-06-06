import { injectStyle } from "../../services/style-injector/style-injector.js"

export class CC_Title extends HTMLElement {
    #root
    #wrapper
    #titleData

    constructor() {
        super()

        this.#root = this.attachShadow({ mode: "closed" })
        injectStyle('src/components/cc-title/cc-title.css', this.#root)

        this.#wrapper = document.createElement('div')
        this.#wrapper.className = '__wrapper'
    }

    render() {
        if (this.#titleData) {
            this.#wrapper.innerHTML = `
                <img userPhoto src="${this.#titleData.userPhoto}">
                <div>
                    <h2 userName>${this.#titleData.userName}</h2>
                    <span lastSeen>${this.#titleData.lastSeen}</span>
                </div>
            `
            this.#root.appendChild(this.#wrapper)
        }
    }

    set userData(value) {
        this.#titleData = value
        this.render()
    }
}

customElements.define("cc-title", CC_Title)