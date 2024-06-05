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

    render(){
        if(this.#titleData){
            this.#wrapper.innerHTML = `
                <img src="${this.#titleData.userPhoto}">
                <h2>${this.#titleData.userName}</h2>
                <span>${this.#titleData.status}</span>
            `
            this.#root.appendChild(this.#wrapper)
        }
    }

    set userData(value){
        this.#titleData = value
        this.render()
    }
}

export class CC_Title2 extends HTMLElement {
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

    render(){
        if(this.#titleData){
            this.#wrapper.innerHTML = `
                <img src="${this.#titleData.userPhoto}">
                <div>
                    <h2>${this.#titleData.userName}</h2>
                    <span>${this.#titleData.status}</span>
                </div>
            `
            this.#root.appendChild(this.#wrapper)
        }
    }

    set userData(value){
        this.#titleData = value
        this.render()
    }

    get userData(){ return this.#titleData}
}

customElements.define("cc-title", CC_Title)
customElements.define("cc-title2", CC_Title2)