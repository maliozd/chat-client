import { config } from '../config.js'
import { EVENTS, API_URLS } from './constants.js';

const loginBtn = document.getElementById('loginBtn');
// console.log(loginBtn)
pass();
function pass(){

    const customEvent = new CustomEvent(EVENTS.LOGIN_SUCCESS, {
        detail: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwMDgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJxd2VAcXdlLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJxd2UiLCJuYmYiOjE3MTc0Mzk1MjksImV4cCI6MTcxNzQ2MTEyOSwiaXNzIjoiY2hhdHNlcnZpY2VAc2VydmljZS5jb20iLCJhdWQiOiJjaGF0c2VydmljZUBzZXJ2aWNlLmNvbSJ9.4VhPtTNpI_2-e9W0e7spwor3zEzxlgOdVjx-gmz01no" }
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
