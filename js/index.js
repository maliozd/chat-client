import { connection, startConnection } from './signalr.js';
import { fetchUsers } from './services/userService.js';
import { fetchMessages, sendChatMessage } from './services/messageService.js';
import { GetToken, config } from './config.js';
import { SidePanelComponent } from './components/sidePanelComponent.js'
import { MessagesComponent } from './components/messagesComponent.js'
import { MessageInputComponent } from './components/messageInputComponent.js'
import { EVENTS } from './constants.js';
import { getChattingUserId,getMyId,setChattingUserId } from './services/valueHelper.js';

let deviceWidth;
let deviceHeight;

let activePanelUserId = null;

function calcSize(width, height) {
    deviceWidth = width;
    deviceHeight = height;

    document.body.style.setProperty('--deviceWidth', `${deviceWidth}px`);
    document.body.style.setProperty('--deviceHeight', `${deviceHeight}px`);
}

window.addEventListener('resize', () => {
    calcSize(window.innerWidth, window.innerHeight);
})

document.addEventListener('DOMContentLoaded', async () => {
    clearLs();
    calcSize(window.innerWidth, window.innerHeight);
});

document.getElementById('userLoginForm').addEventListener(EVENTS.LOGIN_SUCCESS, async (event) => {
    var token = event.detail.token;
    // console.log(token);
    document.querySelector('.popup').classList.remove('active');
    localStorage.setItem("access-token", token);
    await loadLayout();
    await startConnection();
    getData();
})
async function getData() {

    const userResponse = await fetchUsers();
    const messagesResponse = await fetchMessages();

    const mappedUserMessageData = userResponse.map(user => {
        const latestMessage = messagesResponse
            .filter(message => message.fromId === user.id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        return { ...user, latestMessage };
    });

    // console.log(messagesResponse);
    // console.log(mappedUserMessageData);
    // var latestMessage = messagesResponse
    //     .filter(message => message.fromId === config.USER_ID)
    //     .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    //     console.log("latest : ", latestMessage); 
    // activePanelUserMessages = messagesResponse.filter(msg => msg.fromId == latestMessage.fromId);
    // console.log("active messages : ", activePanelUserMessages); 
    // console.log("mappedUserMessageData : ", mappedUserMessageData); 

    renderSidePanel(mappedUserMessageData);

   
    // var latestMessage = messagesResponse.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]

    localStorage.setItem('messages', JSON.stringify(mappedUserMessageData));
    localStorage.setItem('sidePanel_Data', JSON.stringify(userResponse));


    var wrapper = document.querySelector('.messages');
    var messagesDiv = document.querySelector('.messages__list');

    const messagesComponent = new MessagesComponent(messagesDiv, messagesResponse);
    messagesComponent.render();

    const messageInputComponent = new MessageInputComponent(wrapper);
    messageInputComponent.render();
    wrapper.addEventListener(EVENTS.MESSAGE_SENDED, () => {
        console.log(JSON.parse(localStorage.getItem('messages')));

    })

}

function renderSidePanel(sidePanelData) {
    const sidePanelDiv = document.getElementById('sidePanelDiv');
    const sidePanel = new SidePanelComponent(
        sidePanelDiv,
        sidePanelData,
        getMyId()
    );
    sidePanel.render();
    sidePanelDiv.addEventListener(EVENTS.USER_SELECTED, (event) => {
        // console.log(event)
        const userId = event.detail.userId;
        // console.log('Selected user ID:', userId);
        setChattingUserId(userId);
    });
}

function renderMessagesSection(messageData) {
    var messagesDiv = document.querySelector('.messages__list');
    const messagesComponent = new MessagesComponent(messagesDiv, messagesResponse);
    messagesComponent.render();
}

function clearLs() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('messages');
    localStorage.removeItem('sidePanel_Data');
}

async function loadLayout() {
    const responseLayout = await fetch('/layouts/layout.html');
    const layout = await responseLayout.text();
    document.getElementById('canvas').innerHTML = layout;
}


