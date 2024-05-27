// constants.js
export const EVENTS = {
    USER_CHAT_SELECTED: 'userSelected',
    MESSAGE_SENDED: 'messageSended',
    LOGIN_SUCCESS: 'loginSuccess',
};
export const RECEIVE_FUNCTION_NAMES = {
    MESSAGE_RECEIVED : "MessageReceived",
    USER_CONNECTED: 'userConnected'
}
export const INVOKE_FUNCTION_NAMES = {
    // MESSAGE_RECEIVED : "MessageReceived",
    // USER_CONNECTED: 'userConnected'
}

export const API_URLS = {
    LOGIN : "Auth/Login",
    
}
function parseTimestamp(timestamp) {
    const [datePart, timePart] = timestamp.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
}