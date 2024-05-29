import { config } from '../../config.js';
import { getLsToken } from './valueHelper.js';
import { connection } from '../signalr.js'
import { INVOKE_FUNCTION_NAMES, RECEIVE_FUNCTION_NAMES } from '../constants.js';
import { LocalStorageHelper } from '../db/localStoageHelper.js';
export async function fetchMessages() {
    try {
        const response = await fetch(`${config.API_BASE_URL}/Message/`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'ngrok-skip-browser-warning': 69420,
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

export function mapUserLatestMessages(users, messages) {
    return users.map(user => {
        const latestMessage = messages
            .filter(message => message.fromUserId === user.id || message.toUserId === user.id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        return { ...user, latestMessage };
    });
}
export function mapUserMessages(users, messages) {
    return users.map(user => {
        const userMessages = messages
            .filter(message => message.fromUserId == user.id || message.toUserId == user.id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        return userMessages;
    });
}

export function getUserMessagesById(userId) {
    var ls = new LocalStorageHelper();
    var userMessages = ls.getUserMessagesFromStorage(userId);
    return userMessages;
}