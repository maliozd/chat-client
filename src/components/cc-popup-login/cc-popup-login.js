import '' from '../../services/'

export class CC_Popup extends HTMLHeadElement{
    #root
    #wrapper
    constructor(){
        super()

        this.#root = this.attachShadow({mode: 'open'})
        this.#wrapper = document.createElement('div')
        this.#wrapper.className = '__wrapper'

        
        
    }

    render(){
    }
}

customElements.define('cc-popup', CC_Popup)