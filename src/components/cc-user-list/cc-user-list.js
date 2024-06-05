import { injectStyle } from '../../services/style-injector/style-injector.js'
import { CC_User_Item } from '../cc-user-item/cc-user-item.js'

export class CC_User_List extends HTMLElement {
    constructor() {
        super()

        this._userData = null
        this._allUsers = []

        this._root = this.attachShadow({ mode: 'open' })
        injectStyle('src/components/cc-user-list/cc-user-list.css', this._root)
    }

    render() {
        this._userData.forEach(value => {
            let userItem = document.createElement('cc-user-item')
            this._allUsers.push(userItem)

            userItem.params = {
                name: value.userName,
                image: value.userPhoto,
                lastMessage: value.lastMessage,
                lastSeen: value.lastSeen,
            }

            this._root.appendChild(userItem)
        })

        this._allUsers[0].current = true
        this._handleClick()
    }

    get userData() { return this._userData }

    set userData(value) {
        this._userData = value
        this.render()
    }

    _handleClick() {
        this._allUsers.forEach(user => {
            user.addEventListener('click', () => {
                this._allUsers.forEach(u => u.current = false)
                user.current = true
            })
        })
    }
}

customElements.define('cc-user-list', CC_User_List)