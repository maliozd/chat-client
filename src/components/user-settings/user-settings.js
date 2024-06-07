import { PathHandler } from '../../services/path-handler/path-handler.js'
import { cssImporter } from '../../services/css-importer/css-importer.js'
import { htmlImporter } from '../../services/html-importer/html-importer.js'

export class CC_UserSettings extends HTMLElement {
    #data = null
    #root = this.attachShadow({ mode: 'open' })
    #componentName = 'user-settings'

    constructor() {
        super()
    }

    async #render() {
        console.log(this.#data);
        if (this.#data) {
            this.#root.appendChild(await cssImporter(PathHandler.component.css(this.#componentName)))
            this.#root.appendChild(await htmlImporter(PathHandler.component.html(this.#componentName), this.#data))
        }
    }

    set userData(value) {
        this.#data = value
        this.#render()
    }

    get userData() { return this.#data }
}

customElements.define('cc-user-settings', CC_UserSettings)