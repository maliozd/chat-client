import { config } from '../config.js'
import { EVENTS, API_URLS } from './constants.js';

const loginBtn = document.getElementById('loginBtn');
// console.log(loginBtn)
// pass();
function pass(){

    const customEvent = new CustomEvent(EVENTS.LOGIN_SUCCESS, {
        detail: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtZWhtZXRhbGlvemRlbWlyYUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVkZXNjbyIsIm5iZiI6MTcxNzIyODQ2NywiZXhwIjoxNzE3MjUwMDY3LCJpc3MiOiJjaGF0c2VydmljZUBzZXJ2aWNlLmNvbSIsImF1ZCI6ImNoYXRzZXJ2aWNlQHNlcnZpY2UuY29tIn0.NB1wW6ejtjRddVoU9WDRwQCSJmNb3NFMV9kuM1aXVEs" }
    });
    document.getElementById('userLoginForm').dispatchEvent(customEvent);
}

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
        if (res.statusCode == 500) {
            alert(res.message);
        }
        else if (res.statusCode == 200) {

            const customEvent = new CustomEvent(EVENTS.LOGIN_SUCCESS, {
                detail: { token: res.data.token }
            });
            document.getElementById('userLoginForm').dispatchEvent(customEvent);
        }

    } catch (error) {
        console.error(error);
    }

}
