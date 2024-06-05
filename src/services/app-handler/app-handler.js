export class AppHandler {
    constructor(entry, tree) {
        this._entry = entry || null
        this._tree = tree || null

        this._element = null
        this._content = null

        if (this._tree && this._entry) {
            this._entryNode = document.createElement(this._entry)

            this.build(this._entryNode, this._tree)

            document.body.appendChild(this._entryNode)
        }
    }

    build(element, tree) {
        for (let key in tree) {
            let childElement = document.createElement(key)
            element.appendChild(childElement)

            this.build(childElement, tree[key])
        }
    }

    getComponent(nodeName) {
        return this._entryNode.querySelector(nodeName)
    }
}