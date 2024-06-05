const DB_NAME = 'MyAppDB';
const DB_VERSION = 1;
const MESSAGES_STORE = 'messages';
const USERS_STORE = 'users';

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(MESSAGES_STORE)) {
                db.createObjectStore(MESSAGES_STORE, { keyPath: 'userId' });
            }

            if (!db.objectStoreNames.contains(USERS_STORE)) {
                db.createObjectStore(USERS_STORE, { keyPath: 'userId' });
            }
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject('IndexedDB error: ' + event.target.errorCode);
        };
    });
}

function saveMessagesData(db, messagesData) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([MESSAGES_STORE], 'readwrite');
        const store = transaction.objectStore(MESSAGES_STORE);

        messagesData.forEach(message => {
            store.put({ userId: message.userId, messages: message.messages });
        });

        transaction.oncomplete = function () {
            resolve();
        };

        transaction.onerror = function (event) {
            reject('Transaction error: ' + event.target.errorCode);
        };
    });
}

function saveUsersData(db, usersData) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([USERS_STORE], 'readwrite');
        const store = transaction.objectStore(USERS_STORE);

        usersData.forEach(user => {
            store.put({ userId: user.userId, sidePanelData: user.sidePanelData });
        });

        transaction.oncomplete = function () {
            resolve();
        };

        transaction.onerror = function (event) {
            reject('Transaction error: ' + event.target.errorCode);
        };
    });
}

async function save(messagesData, usersData) {
    try {
        const db = await openDatabase();
        console.log(db);
        // await saveMessagesData(db, messagesData);
        // await saveUsersData(db, usersData);
        // console.log('Data saved to IndexedDB successfully.');
    } catch (error) {
        console.error('Error saving data to IndexedDB:', error);
    }
}


function getMessagesData(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([MESSAGES_STORE], 'readonly');
        const store = transaction.objectStore(MESSAGES_STORE);
        const request = store.getAll();

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject('Transaction error: ' + event.target.errorCode);
        };
    });
}

function getUsersData(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([USERS_STORE], 'readonly');
        const store = transaction.objectStore(USERS_STORE);
        const request = store.getAll();

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject('Transaction error: ' + event.target.errorCode);
        };
    });
}

async function loadDataFromIndexedDb() {
    try {
        const db = await openDatabase();
        const messagesData = await getMessagesData(db);
        const usersData = await getUsersData(db);
        console.log('Messages data loaded from IndexedDB:', messagesData);
        console.log('Users data loaded from IndexedDB:', usersData);
        return { messagesData, usersData };
    } catch (error) {
        console.error('Error loading data from IndexedDB:', error);
    }
}



function getUserDataById(db, userId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([USERS_STORE], 'readonly');
        const store = transaction.objectStore(USERS_STORE);
        const request = store.get(userId);

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject('Transaction error: ' + event.target.errorCode);
        };
    });
}
function getMessagesDataById(db, userId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([MESSAGES_STORE], 'readonly');
        const store = transaction.objectStore(MESSAGES_STORE);
        const request = store.get(userId);

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject('Transaction error: ' + event.target.errorCode);
        };
    });
}

export function saveDataToIndexedDb(messagesData, usersData) {

    save(messagesData, usersData);
}