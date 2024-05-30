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
        activeUserStateManager.activeUserId = 7;
        //user & latest message
        const mappedUserLatestMessageData = mapUserLatestMessages(usersResponse, messagesResponse.messages);
        //user & messages
        const mappedUserMessagesData = mapUserMessages(usersResponse, messagesResponse.messages);

        ls.saveDataToLocalStorage(mappedUserLatestMessageData, mappedUserMessagesData);

        renderSidePanel(mappedUserLatestMessageData);
        renderActiveChattingUserComponent();

        console.log(mappedUserMessagesData);
        renderMessagesComponent(mappedUserMessagesData)
        setupMessageInputComponent();
        setupMessageListener();
    } catch (error) {
        console.error('Error initializing data:', error);
    }
}


function renderSidePanel(mappedUserLatestMessageData) {
    const sidePanel = document.querySelector('side-panel-component');
    if (sidePanel) {
        sidePanel.data = mappedUserLatestMessageData;
    }
}

function renderActiveChattingUserComponent() {
    const activeChattingUserComponent = document.querySelector('chatting-user-component');
    console.log(activeChattingUserComponent);
    if (activeChattingUserComponent) {
        var user = getCurrentUserInfo();
        activeChattingUserComponent.data = {
            username: user.id,
            id: user.id
        }
    }
}
function renderMessagesComponent(mappedUserMessagesData) {
    let filteredMessages = mappedUserMessagesData;
    if (mappedUserMessagesData) {
        //şimdilik statik bir değer verdim
        var userId = activeUserStateManager.activeUserId;
        // console.log(userId);
        
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
        filteredMessages = mappedUserMessagesData.flatMap(userMessages => {
            return userMessages.filter(message => message.fromUserId == userId || message.toUserId == userId);
        });
        // console.log("filtered messages : ", filteredMessages);

        var filteredMessagesFilteredMessages = filteredMessages.filter(message => message.fromUserId == userId || message.toUserId == userId);
        console.log(filteredMessagesFilteredMessages);
    }
    const messagesComponent = document.querySelector('message-list-component');
    console.log(messagesComponent);
    messagesComponent.data = filteredMessages;
}
function setupMessageInputComponent() {
    // const wrapper = document.querySelector('.messages');
    const messagesComponent = document.querySelector('messages-component');
    const messageInputComponent = document.createElement('message-input-component');
    // wrapper.appendChild(messageInputComponent);
    messageInputComponent.addEventListener(EVENTS.MESSAGE_SENDED, (event) => {
        messagesComponent.addNewMessage(event.detail);
    });
}

function setupMessageListener() {
    signalRConnection.on(RECEIVE_FUNCTION_NAMES.MESSAGE_RECEIVED, (messageData) => {
        if (messageData.fromUserId === getChattingUserId() || messageData.toUserId === getChattingUserId()) {
            const messagesComponent = document.querySelector('messages-component');
            messagesComponent.addNewMessage(messageData);
        }
    });
}



function clearLocalStorage() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('messages');
    localStorage.removeItem('sidePanel_Data');
}

initialize();