import { executeQuery, executeUpdate } from './database.js';

export function addUser(user) {
    const query = `INSERT INTO users (id,username, profile_pic_url, lastSeen,onlineStatus, status) VALUES (?, ?, ?, ?, ?,?)`;
    const params = [user.id, user.username, user.profilePicturePath, user.lastSeen, 0, 0];
    executeUpdate(query, params);
}

export function getUserById(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    return executeQuery(query, [id]);
}

export function updateUser(id, fields) {
    const sets = Object.keys(fields).map(key => `${key} = ?`).join(', ');
    const params = [...Object.values(fields), id];
    const query = `UPDATE users SET ${sets} WHERE id = ?`;
    executeUpdate(query, params);
}

export function getUsersByUsername(username) {
    const query = `SELECT * FROM users WHERE username LIKE ?`;
    const params = [`%${username}%`];
    return executeQuery(query, params);
}

export function addInitialUsers(users) {
    users.forEach(user => addUser(user));
}