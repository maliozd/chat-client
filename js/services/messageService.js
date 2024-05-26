import { config } from '../config.js';

export async function fetchMessages() {
    try {
        const response = await fetch(`${config.API_BASE_URL}/Message/`, {
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
        console.error(error)
    }

}

export async function sendMessage(message) {
    await fetch(`${config.API_BASE_URL}/Message/`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${config.TOKEN}`

        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(message)
    });
}
