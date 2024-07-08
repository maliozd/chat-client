import { executeQuery, executeUpdate } from './database.js';

export function addMessage(id,fromUserId, toUserId, messageText,timestamp,isRead) {
    const query = `INSERT INTO messages (id, fromUserId, toUserId, messageText, timestamp, isRead) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [id,fromUserId, toUserId, messageText, timestamp, isRead];
    executeUpdate(query, params);
}

export function getMessagesForUser(userId) {
    const query = `SELECT * FROM messages WHERE fromUserId = ? OR toUserId = ? ORDER BY timestamp`;
    return executeQuery(query, [userId, userId]);
}

export function markMessageAsRead(messageId) {
    const query = `UPDATE messages SET isRead = 1 WHERE id = ?`;
    executeUpdate(query, [messageId]);
}


export function addInitialMessages(messages) {
    messages.forEach(userMessages => {
        userMessages.messages.forEach((message) => {
            addMessage(message.id,message.fromUserId,message.toUserId,message.messageText,message.timestamp,0)
        })
});

}
export function getLastMessageForUser(userId) {
    const query = `
        SELECT * FROM messages 
        WHERE fromUserId = ? OR toUserId = ? 
        ORDER BY timestamp DESC 
        LIMIT 1
    `;
    return executeQuery(query, [userId, userId]);
}