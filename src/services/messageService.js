import { config } from '../../config.js';
import { getLsToken } from './valueHelper.js';
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
const ls = window.lsHelper;



/** 
@param message dataModel
id
messageText
fromUserId
toUserId
timestamp
isRead 
*/

/**
 * maps each user to their latest message
 * @param {Array} users -  list of users. each user is an object with at least an 'id' property.
 * @param {Array} messages -  list of messages. each message is an object with "id","messageText",'fromUserId', 'toUserId', and 'timestamp' properties.
 * @returns {Array} - A new list of users, each with an additional 'latestMessage' property containing their most recent, newest, message.
 */
export function mapUserLatestMessages(users, userMessages) {
    return users.map(user => {
        const msgObj = userMessages.find(userAndMessages => userAndMessages.userId === user.id);
        if (!msgObj) {
            return { ...user, latestMessage: null };
        }
        const _messages = msgObj.messages;
        const latestMessage = Array.from(_messages).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        return { ...user, latestMessage };
    });
}
/**
 * maps each user to all their messages.
 * @param {Array} users -  list of users. Each user is an object with at least an 'id' property.
 * @param {Array} messages -  list of messages. Each message is an object with 'fromUserId', 'toUserId', and 'timestamp' properties.
 * @returns {Array} - A new list of objects where each object contains a 'userId' and an array of 'messages' for that user.
 */
export function mapUserMessages(users, messages) {
    return users.map(user => {
        const userMessages = messages
            .filter(message => message.fromUserId == user.id || message.toUserId == user.id)
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        return {
            userId: user.id,
            messages: [...userMessages]
        };
    });
}

