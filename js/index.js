import { signalRConnection, startConnection } from './signalr.js';
import { fetchUsers } from './services/userService.js';
import { fetchMessages, mapUserLatestMessages, mapUserMessages } from './services/messageService.js';
import { EVENTS, RECEIVE_FUNCTION_NAMES } from './constants.js';
import { getCurrentUserInfo } from './services/valueHelper.js';
import './components/messageInputComponent.js'; // MessageInputComponent import edildi
import './components/sidePanelComponent.js';
import './db/localStoageHelper.js';
import { LocalStorageHelper } from './db/localStoageHelper.js';
import activeUserStateManager from './states/activeUserStateManager.js';

const ls = new LocalStorageHelper();

const messagesComponent = document.querySelector('message-list-component');
const activeChattingUserComponent = document.querySelector('chatting-user-component');
const messageInputComponent = document.querySelector("message-input-component")
const sidePanelComponent = document.querySelector('side-panel-component');


async function initialize() {
    clearLocalStorage();
    calculateDeviceSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', () => calculateDeviceSize(window.innerWidth, window.innerHeight));
    document.addEventListener('DOMContentLoaded', async () => {
        calculateDeviceSize(window.innerWidth, window.innerHeight);
    });
    setupLoginFormListener();
}
function calculateDeviceSize(width, height) {
    document.body.style.setProperty('--deviceWidth', `${width}px`);
    document.body.style.setProperty('--deviceHeight', `${height}px`);
}

function setupLoginFormListener() {
    document.getElementById('userLoginForm').addEventListener(EVENTS.LOGIN_SUCCESS, async (event) => {
        const token = event.detail.token;
        document.querySelector('.popup').classList.remove('active');
        localStorage.setItem("access-token", token);
        await startConnection();
        await initializeData();
    });
}

async function initializeData() {
    try {
        const usersResponse = await fetchUsers();
        const messagesResponse = await fetchMessages();
        //şimdilik initial statik bir değer verdim
        //user & latest message
        const mappedUserLatestMessageData = mapUserLatestMessages(usersResponse, messagesResponse.messages);
        const mappedUserMessagesData = mapUserMessages(usersResponse, messagesResponse.messages);

        ls.saveDataToLocalStorage(usersResponse, mappedUserLatestMessageData, mappedUserMessagesData);
        sidePanelComponent.data = mappedUserLatestMessageData;
        messagesComponent.data = mappedUserMessagesData.messages;

        var user = getCurrentUserInfo();
        // activeChattingUserComponent.data = {
        //     username: user.id,
        //     id: user.id
        // }

    } catch (error) {
        console.error('Error initializing data:', error);
    }
}

document.querySelector('side-panel-component').addEventListener(EVENTS.ACTIVE_USER_CHAT_CHANGED, async (event) => {
    const { activeUserId } = event.detail;
    console.log(activeUserId);

    var userMessageData = ls.getUserMessagesFromStorage(parseInt(activeUserId));
    messagesComponent.data = userMessageData.messages;
    messageInputComponent.activeUserId = activeUserId;
    var selectedUser = ls.getUserById(activeUserId);
    activeChattingUserComponent.data = selectedUser;
})

messageInputComponent.addEventListener(EVENTS.MESSAGE_SENDED, (event) => {
    messagesComponent.addNewMessage(event.detail);
});

//IDEA 
//i can create a base class and initiliza signalR connection on that. 
//and extend my components from base class that i created
//connection and signal events can dispatching from that base component
//connection can be managable on my components ? 
//and my child components can listen that base component's events. 
function clearLocalStorage() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('messages');
    localStorage.removeItem('sidePanel_Data');
}

signalRConnection.on(RECEIVE_FUNCTION_NAMES.MESSAGE_RECEIVED, (message) => {
    console.log(message);
    ls.addNewMessageToUserMessages(parseInt(message.toUserId), message);
    if (messageInputComponent.activeUserId == message.fromUserId) {
        messagesComponent.addNewMessage(message);
    }

});

initialize();