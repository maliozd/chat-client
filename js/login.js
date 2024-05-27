import { config } from '../config.js'
import { EVENTS,API_URLS } from './constants.js';

const loginBtn = document.getElementById('loginBtn');
// console.log(loginBtn)

loginBtn.addEventListener('click', () => {
    submitForm();
});

document.getElementById('password').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        submitForm();
    }
});

async function submitForm() {
    const emailOrUsername = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginReq = {
        usernameOrEmail: emailOrUsername,
        password: password
    };
    try {
        var response = await fetch(`${config.API_BASE_URL}/${API_URLS.LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors',
                'cache': 'no-cache',
                'credentials': 'same-origin',
            },
            body: JSON.stringify(loginReq)
        });

        var res = await response.json();
        console.log(res);
        if(res.statusCode == 500)
            {
                alert(res.message);
            }
            else if (res.statusCode == 200){
       
                const customEvent = new CustomEvent(EVENTS.LOGIN_SUCCESS, {
                    detail: { token: res.data.token }
                });
                document.getElementById('userLoginForm').dispatchEvent(customEvent);
            }

    } catch (error) {
        console.error(error);
    }

}
