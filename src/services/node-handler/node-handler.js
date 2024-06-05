export class NodeHandler {
    constructor(income) {
        this._type = income.type || null
        this._attributes = income.attributes || null
        this._node = null
        this._innerText = income.innerText

        if (this._type && this._attributes) {
            this._node = document.createElement(this._type)

            this.update()
        }
    }

    update() {
        for (let attribute in this._attributes) {
            this._node.setAttribute(attribute, this._attributes[attribute])
        }

        if (this._innerText) {
            this._node.innerText = this._innerText
        }
    }

    get node() { return this._node }
}