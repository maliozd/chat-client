export class sidePanel extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
            <select>
                <option>asd</option>
                <option>asd</option>
                <option>asd</option>
                <option>attachShadow</option>
            </select>
        `
    }
}