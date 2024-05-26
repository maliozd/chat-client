import { config,GetToken } from '../config.js';

export async function fetchUsers() {
    try {
        // console.log(GetToken())
        const response = await fetch(`${config.API_BASE_URL}/User/`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'ngrok-skip-browser-warning':69420,
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${GetToken()}`
            },
        });

        return response.json();
    } catch (error) {
        console.error(error);
    }
}
