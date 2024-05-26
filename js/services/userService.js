import { config } from '../config.js';

export async function fetchUsers() {
    try {
        const response = await fetch(`${config.API_BASE_URL}/User/`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${config.TOKEN}`
            },
        });

        return response.json();
    } catch (error) {
        console.error(error);
    }
}
