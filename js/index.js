import { connection, startConnection } from './signalr.js';
import { fetchUsers } from './services/userService.js';
import { fetchMessages } from './services/messageService.js';
import { EVENTS, RECEIVE_FUNCTION_NAMES } from './constants.js';
import { getCurrentUserId, getChattingUserId, setChattingUserId } from './services/valueHelper.js';
import './components/messageInputComponent.js'; // MessageInputComponent import edildi
import './components/sidePanelComponent.js';

let messagesComponent;
async function initialize() {
    // if (!document.querySelector('#canvas').innerHTML.trim()) {
        clearLocalStorage();
        calculateDeviceSize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', () => calculateDeviceSize(window.innerWidth, window.innerHeight));
        document.addEventListener('DOMContentLoaded', async () => {
            calculateDeviceSize(window.innerWidth, window.innerHeight);
        });
        setupLoginFormListener();
    // }
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
        // await loadLayout();
        await initializeData();
        loadCSS();
    });
}

async function initializeData() {
    try {
        const users = await fetchUsers();
        const messages = await fetchMessages();
        const mappedUserMessageData = mapUserMessages(users, messages.messages);
        console.log(mappedUserMessageData);
        renderSidePanel(mappedUserMessageData);
        saveDataToLocalStorage(mappedUserMessageData, users);

        messagesComponent = document.querySelector('messages-component');
        messagesComponent.messages = messages.messages;

        setupMessageInputComponent();
        setupMessageListener();
    } catch (error) {
        console.error('Error initializing data:', error);
    }
}

function mapUserMessages(users, messages) {
    return users.map(user => {
        const latestMessage = messages
            .filter(message => message.fromUserId === user.id || message.toUserId === user.id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        return { ...user, latestMessage };
    });
}

function initializeSidePanelComponent() {
    const sidePanelDiv = document.getElementById('sidePanelDiv');
    if (!sidePanelDiv.querySelector('side-panel-component')) {
        const sidePanel = document.createElement('side-panel-component');
        sidePanelDiv.appendChild(sidePanel);
    }
}

function renderSidePanel(data) {
    const sidePanel = document.querySelector('side-panel-component');
    if (sidePanel) {
        sidePanel.data = data;
        sidePanel.addEventListener(EVENTS.USER_CHAT_SELECTED, (event) => {
            const userId = event.detail.userId;
            setChattingUserId(userId);
        });
    }
}


function setupMessageInputComponent() {
    const wrapper = document.querySelector('.messages');
    const messageInputComponent = document.createElement('message-input-component');
    wrapper.appendChild(messageInputComponent);
    messageInputComponent.addEventListener(EVENTS.MESSAGE_SENDED, (event) => {
        messagesComponent.addNewMessage(event.detail);
    });
}

function setupMessageListener() {
        connection.on(RECEIVE_FUNCTION_NAMES.MESSAGE_RECEIVED, (messageData) => {
            if (messageData.fromUserId === getChattingUserId() || messageData.toUserId === getChattingUserId()) {
                messagesComponent.addNewMessage(messageData);
            }
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
    if (!document.getElementById('canvas').innerHTML.trim()) {
        try {
            const responseLayout = await fetch('/layouts/layout.html');
            const layout = await responseLayout.text();
            document.getElementById('canvas').innerHTML = layout;
            initializeSidePanelComponent();
        } catch (error) {
            console.error('Error loading layout:', error);
        }
    }
}
function loadCSS() {  
  
   
  
    var head = document.getElementsByTagName('head')[0] 
      
    // Creating link element 
    var style = document.createElement('link')  
    style.href = 'css/style.css'
    style.type = 'text/css'
    style.rel = 'stylesheet'
    head.append(style); 
    host.shadowRoot.appendChild( style )
    // Adding the name of the file to keep record 
    // filesAdded += ' styles.css' 
}

initialize();
