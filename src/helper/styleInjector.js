/**
 * Description placeholder
 *
 * @export
 * @class styleInjector
 * @typedef {styleInjector}
 */
export class styleInjector {
    /**
     * Creates an instance of styleInjector.
     *
     * @constructor
     * @param {string} type either 'style' or 'link' 
     * @param {string} style either 'cssContent' or 'filePath'
     */
    constructor(type, value) {
        this.type = type || null
        this.value = value || null

        if (this.value && this.type) {
            this.node = document.createElement(this.type)

            if (this.node.nodeName.toLowerCase() === 'style') {
                this.node.innerHTML = this.value
            } else if (this.node.nodeName.toLowerCase() === 'link') {
                this.node.rel = 'stylesheet'
                this.node.href = this.value
            }

            this.inject(this.node)
        }
    }

    /**
     * Inject <link> or <stlye> element
     */
    inject(element) {
        document.head.appendChild(element)
    }

    /**
     * Deject <link> or <stlye> element
     */
    deject(element) {
        element.remove()
    }
}