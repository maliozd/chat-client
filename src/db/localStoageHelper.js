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

    getSidePanelDataFromStorage() {
        try {
            const sidepanelData = JSON.parse(localStorage.getItem('sidePanel_Data')) || [];
            return sidepanelData;
        } catch (error) {
            console.error("Error getting messages from storage:", error);
            return [];
        }
    }
    getUserById(userId) {
        var users = JSON.parse(localStorage.getItem("users"));
        return users.find(u =>u.id == userId);
    }

    getUserMessagesFromStorage(userId) {
        try {
            const userMessages = JSON.parse(localStorage.getItem('user_messages'));
            var data = userMessages.filter(element => element.userId == userId)[0];
            console.log(data);
            if (!data)
                return null;
            
            if (data.messages.length > 0) {
                data.messages.forEach(msg => {
                    msg.isRead = true;
                });
            }
            return data;

        } catch (error) {
            console.error(`Error getting messages for user ${userId} from storage:`, error);
            return [];
        }
    }

    getUserLastMessageFromStorage(userId) {
        try {
            const sidepanelData = JSON.parse(localStorage.getItem('sidePanel_Data')) || [];
            console.log(sidepanelData);
        } catch (error) {
            console.error(`Error getting last message for user ${userId} from storage:`, error);
            return [];
        }
    }

    //calling init on index.js 
    saveDataToLocalStorage(users,usersWithLastMessages, usersWithMessages) {
        try {
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user_messages', JSON.stringify(usersWithMessages));
            localStorage.setItem('sidePanel_Data', JSON.stringify(usersWithLastMessages));
        } catch (error) {
            console.error("Error saving data to localStorage:", error);
        }
    }


    addNewMessageToUserMessages(userId, message) {
        // const allUserMessages = JSON.parse(localStorage.getItem('user_messages'));
        // let userMessages = allUserMessages.filter(element => element.userId == userId)[0].messages;
        // userMessages.push(message);

        // localStorage.setItem('user_messages', JSON.stringify(usersWithMessages));
        try {
            const allUserMessages = JSON.parse(localStorage.getItem('user_messages'));
            const userIndex = allUserMessages.findIndex(element => element.userId === userId);
            console.log(message);
            console.log(allUserMessages[userIndex]);
            if (userIndex !== -1) { //if user messages already exist  
                allUserMessages[userIndex].messages.push(message);
                console.log(allUserMessages[userIndex]);
            } else {
                allUserMessages.push({ userId, messages: [message] }); //new
            }

            localStorage.setItem('user_messages', JSON.stringify(allUserMessages));
        } catch (error) {
            console.error(`Error adding new message for user ${userId} to storage:`, error);
        }


    }

    clearStorage() {
        try {
            localStorage.removeItem('users');
            localStorage.removeItem('messages');
            localStorage.removeItem('user_messages');
            localStorage.removeItem('sidePanel_Data');
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    }
}

window.lsHelper = new LocalStorageHelper();