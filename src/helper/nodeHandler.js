export class nodeHandler {
    constructor(parent, node) {
        if (node && parent) {
            this._parent = parent || null
            this._node = document.createElement(node) || null

            this.addToPage()
        }
    }

    get node() { return this._node }

    addToPage() {
        this._parent.appendChild(this._node)
    }

    removeToPage() {
        this._parent.removeChild(this._node)
    }
}