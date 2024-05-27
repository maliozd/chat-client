import { config } from '../../config.js';
import { getLsToken } from './valueHelper.js';

export async function fetchMessages() {
    try {
        const response = await fetch(`${config.API_BASE_URL}/Message/`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                // 'ngrok-skip-browser-warning':69420,
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getLsToken()}`
            },
        });
        return response.json();
    } catch (error) {
        console.error(error)
    }
}

export async function sendChatMessage(message) {
    await fetch(`${config.API_BASE_URL}/Message/`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            // 'ngrok-skip-browser-warning':69420,
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${getLsToken()}`

        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(message)
    });
}
