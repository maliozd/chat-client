import { injectStyle } from "../../services/style-injector/style-injector.js"

export class CC_Popup extends HTMLElement {
    #root
    #wrapper
    #userName
    #password
    #login
    constructor() {
        super()

        this.#root = this.attachShadow({ mode: 'open' })
        this.#wrapper = document.createElement('div')
        this.#wrapper.className = '__wrapper'

        injectStyle('src/components/cc-popup-login/cc-popup-login.css', this.#root)

        this.#wrapper.innerHTML = `
                <img loginWall src="src/images/background/login-1.jpeg">
                <form>
                    <img src="src/images/background/user.jpeg">
                    <div>
                        <label>User Name</label>
                        <input userName type="text">
                    </div>
                    <div>
                        <label>Password</label>
                        <input password type="password">
                    </div>
                    <button login type="button">Login</button>
                </form>
        `

        this.#root.appendChild(this.#wrapper)

        this.#userName = this.#root.querySelector('[userName]')
        this.#password = this.#root.querySelector('[password]')
        this.#login = this.#root.querySelector('[login]')

        this.#handleFocus()

        this.#eventListener()
    }

    #handleFocus() {
        this.#userName.addEventListener('focusin', (e) => {
            e.target.parentElement.querySelector('label').style.top = '-30%'
        })
        this.#password.addEventListener('focusin', (e) => {
            e.target.parentElement.querySelector('label').style.top = '-30%'
        })
        this.#userName.addEventListener('focusout', (e) => {
            if (this.#userName.value === '') {
                e.target.parentElement.querySelector('label').style.top = '50%'
            }
        })
        this.#password.addEventListener('focusout', (e) => {
            if (this.#userName.value === '') {
                e.target.parentElement.querySelector('label').style.top = '50%'
            }
        })
    }

    #eventListener() {
        this.#password.addEventListener('keydown', this.#debounce((e) => {
            if (e.key === 'Enter') {
                this.#handleLogin(this.#userName.value, this.#password.value);
            }
        }, 100))

        this.#userName.addEventListener('keydown', this.#debounce((e) => {
            if (e.key === 'Enter') {
                this.#handleLogin(this.#userName.value, this.#password.value);
            }
        }, 100))

        this.#login.addEventListener('click', () => {
            this.#handleLogin(this.#userName.value, this.#password.value);
        })
    }

    #handleLogin(userName, password) {
        const event = new CustomEvent('login', {
            detail: {
                userName: userName,
                password: password,
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
        this.#clear()
    }

    #clear() {
        this.#userName.value = null
        this.#password.value = null

        this.#root.querySelectorAll('label').forEach(e => e.style.top = '50%')
    }

    #debounce(func, wait) {
        let timeout
        return function (...args) {
            clearTimeout(timeout)
            timeout = setTimeout(() => func.apply(this, args), wait)
        }
    }
}

customElements.define('cc-popup', CC_Popup)