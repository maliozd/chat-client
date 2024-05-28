import { connection, startConnection } from './signalr.js';
import { fetchUsers } from './services/userService.js';
import { fetchMessages, sendChatMessage } from './services/messageService.js';
import { config } from '../config.js';
import { SidePanelComponent } from './components/sidePanelComponent.js';
import { MessagesComponent } from './components/messagesComponent.js';
import { MessageInputComponent } from './components/messageInputComponent.js';
import { EVENTS } from './constants.js';
import { getChattingUserId, getCurrentUserId, setChattingUserId } from './services/valueHelper.js';
import { getLsToken } from './services/valueHelper.js';

let deviceWidth;
let deviceHeight;

function initialize() {
    console.log(config.API_BASE_URL)
    clearLocalStorage();
    calculateDeviceSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', () => calculateDeviceSize(window.innerWidth, window.innerHeight));
    document.addEventListener('DOMContentLoaded', async () => {
        clearLocalStorage();
        calculateDeviceSize(window.innerWidth, window.innerHeight);
    });
    setupLoginFormListener();
}

function calculateDeviceSize(width, height) {
    deviceWidth = width;
    deviceHeight = height;
    document.body.style.setProperty('--deviceWidth', `${deviceWidth}px`);
    document.body.style.setProperty('--deviceHeight', `${deviceHeight}px`);
}

function setupLoginFormListener() {
    document.getElementById('userLoginForm').addEventListener(EVENTS.LOGIN_SUCCESS, async (event) => {
        const token = event.detail.token;
        document.querySelector('.popup').classList.remove('active');
        localStorage.setItem("access-token", token);
        await startConnection();
        await loadLayout();
        await initializeData();
    });
}

async function initializeData() {
    try {
        const users = await fetchUsers();
        const messages = await fetchMessages();
        const mappedUserMessageData = mapUserMessages(users, messages.messages);

        renderSidePanel(mappedUserMessageData);
        saveDataToLocalStorage(mappedUserMessageData, users);
        renderMessagesComponent(messages.messages);
        setupMessageInputComponent();

    } catch (error) {
        console.error('Error initializing data:', error);
    }
}

function mapUserMessages(users, messages) {
    return users.map(user => {
        const latestMessage = messages
            .filter(message => message.fromUserId === user.id || message.toUserId == user.id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        return { ...user, latestMessage };
    });
}

function renderSidePanel(data) {
    const sidePanelDiv = document.getElementById('sidePanelDiv');
    const sidePanel = new SidePanelComponent(sidePanelDiv, data, getCurrentUserId());
    sidePanel.render();
    sidePanelDiv.addEventListener(EVENTS.USER_CHAT_SELECTED, (event) => {
        const userId = event.detail.userId;
        setChattingUserId(userId);
    });
}

function renderMessagesComponent(messages) {
    const messagesDiv = document.querySelector('.messages__list');
    const messagesComponent = new MessagesComponent(messagesDiv, messages);
    messagesComponent.render();
}

function setupMessageInputComponent() {
    const wrapper = document.querySelector('.messages');
    const messageInputComponent = new MessageInputComponent(wrapper);
    messageInputComponent.render();
    wrapper.addEventListener(EVENTS.MESSAGE_SENDED, () => {
        // console.log(JSON.parse(localStorage.getItem('messages')));
        //TODO
    });
}

function saveDataToLocalStorage(messagesData, usersData) {
    localStorage.setItem('messages', JSON.stringify(messagesData));
    localStorage.setItem('sidePanel_Data', JSON.stringify(usersData));
}

function clearLocalStorage() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('messages');
    localStorage.removeItem('sidePanel_Data');
}

async function loadLayout() {
    try {
        const responseLayout = await fetch('/layouts/layout.html');
        const layout = await responseLayout.text();
        document.getElementById('canvas').innerHTML = layout;
    } catch (error) {
        console.error('Error loading layout:', error);
    }
}

initialize();
