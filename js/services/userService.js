import { config } from '../../config.js';
import { getLsToken } from './valueHelper.js';

export async function fetchUsers() {
    try {
        const response = await fetch(`${config.API_BASE_URL}/User/`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'ngrok-skip-browser-warning':69420,
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getLsToken()}`
            },
        });

        return response.json();
    } catch (error) {
        console.error(error);
    }
}
