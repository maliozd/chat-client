
let db;

export async function initDatabase() {
    const SQL = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });
    db = new SQL.Database();
    console.log("Database initialized");

    // Create tables
    const createUsersTableCommand = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            profile_pic_url TEXT,
            lastSeen DATETIME,
            status INTEGER,
            onlineStatus INTEGER
        );
    `;
    
    const createMessagesTableCommand = `
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY,
            fromUserId INTEGER,
            toUserId INTEGER,
            messageText TEXT,
            timestamp DATETIME,
            is_read INTEGER
        );
    `;

    db.run(createUsersTableCommand);
    db.run(createMessagesTableCommand);
    console.log("Tables created");
}

export function executeQuery(query, params = []) {
    try {
        const stmt = db.prepare(query);
        stmt.bind(params);
        let result = [];
        while (stmt.step()) {
            result.push(stmt.getAsObject());
        }
        stmt.free();
        return result;
    } catch (error) {
        console.error("Error executing query:", error);
    }
}

export function executeUpdate(query, params = []) {
    try {
        db.run(query, params);
    } catch (error) {
        console.error("Error executing update:", error);
        console.error("Error executing update:", query,params);
    }
}
