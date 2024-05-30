export class LocalStorageHelper {
    getMessagesFromStorage() {
        try {
            const messages = JSON.parse(localStorage.getItem('messages')) || [];
            return messages;
        } catch (error) {
            console.error("Error getting messages from storage:", error);
            return [];
        }
    }

    getUserMessagesFromStorage(userId) {
        try {
            const userMessages = JSON.parse(localStorage.getItem('user_messages')) || {};
            return userMessages[userId] || [];
        } catch (error) {
            console.error(`Error getting messages for user ${userId} from storage:`, error);
            return [];
        }
    }

    saveDataToLocalStorage(usersWithLastMessages, usersWithMessages) {
        try {
            localStorage.setItem('user_messages', JSON.stringify(usersWithMessages));
            localStorage.setItem('sidePanel_Data', JSON.stringify(usersWithLastMessages));
        } catch (error) {
            console.error("Error saving data to localStorage:", error);
        }
    }

    saveUserMessagesToStorage(userId, messages) {
        try {
            const userMessages = JSON.parse(localStorage.getItem('user_messages')) || {};
            userMessages[userId] = messages;
            localStorage.setItem('user_messages', JSON.stringify(userMessages));
        } catch (error) {
            console.error(`Error saving messages for user ${userId} to storage:`, error);
        }
    }

    clearStorage() {
        try {
            localStorage.removeItem('messages');
            localStorage.removeItem('user_messages');
            localStorage.removeItem('sidePanel_Data');
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    }
}
