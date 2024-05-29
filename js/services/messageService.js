import { config } from '../../config.js';
import { getLsToken } from './valueHelper.js';
import { connection } from '../signalr.js'
import { INVOKE_FUNCTION_NAMES, RECEIVE_FUNCTION_NAMES } from '../constants.js';
export async function fetchMessages() {
    try {
        const response = await fetch(`${config.API_BASE_URL}/Message/`, {
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
        var responseBody = await response.json();
        return responseBody.data;
    } catch (error) {
        console.error(error)
    }
}

export async function sendChatMessage(message) {
  
    connection.invoke(INVOKE_FUNCTION_NAMES.SEND_MESSAGE, message);
  
}
