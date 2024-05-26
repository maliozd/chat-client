// constants.js
export const EVENTS = {
    USER_SELECTED: 'userSelected',
};
export const RECEIVE_FUNCTION_NAMES = {
    MESSAGE_RECEIVED : "MessageReceived",
    USER_CONNECTED: 'userConnected'
}
function parseTimestamp(timestamp) {
    const [datePart, timePart] = timestamp.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
}