import { connection, startConnection } from './signalr.js';
import { fetchUsers } from './services/userService.js';
import { fetchMessages, sendMessage } from './services/messageService.js';
import { config } from './config.js';
import { SidePanelComponent } from './components/sidePanelComponent.js'
import { MessagesComponent } from './components/messagesComponent.js'
import { MessageInputComponent } from './components/messageInputComponent.js'
import { EVENTS } from './constants.js';

let deviceWidth;
let deviceHeight;

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
    calcSize(window.innerWidth, window.innerHeight);

    await loadLayout();

    const userResponse = await fetchUsers();
    const messagesResponse = await fetchMessages();

    const sidePanelData = userResponse.map(user => {
        const latestMessage = messagesResponse
            .filter(message => message.fromId === user.id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        return { ...user, latestMessage };
    });

    var latestMessage = messagesResponse
        .filter(message => message.fromId === config.USER_ID)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    renderSidePanel(sidePanelData);
    sidePanelDiv.addEventListener(EVENTS.USER_SELECTED, (event) => {
        console.log(event)
        const userId = event.detail.userId;
        console.log('Selected user ID:', userId);
        //TODO 
        // handleUserSelection(userId);
    });
    // var latestMessage = messagesResponse.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]

    localStorage.setItem('messages', JSON.stringify(sidePanelData));
    localStorage.setItem('sidePanel_Data', JSON.stringify(userResponse));

    await startConnection();

    var wrapper = document.querySelector('.messages');
    var messagesDiv = document.querySelector('.messages__list');
    const messagesComponent = new MessagesComponent(messagesDiv, messagesResponse);
    messagesComponent.render();

    const messageInputComponent = new MessageInputComponent(wrapper);
    messageInputComponent.render();

    messageInputComponent.addEventListener(async (message) => {
        const message1 = {
            messageText: message,
            fromUserId: config.USER_ID,
            toUserId: 7,
        };
        await sendMessage(message1);
        const lsMessages = JSON.parse(localStorage.getItem('messages'));
        lsMessages.push({
            messageText: message.message,
            fromName: message.fromName,
            fromId: message.fromId,
            timestamp: new Date().getTime(),
        });
        messagesComponent.render(lsMessages);
    })
});

function renderSidePanel(sidePanelData) {
    const sidePanelDiv = document.getElementById('sidePanelDiv');
    const sidePanel = new SidePanelComponent(
        sidePanelDiv,
        sidePanelData,
        config.USER_ID
    );
    sidePanel.render();
}

async function loadLayout() {
    const responseLayout = await fetch('/layouts/layout.html');
    const layout = await responseLayout.text();
    document.getElementById('canvas').innerHTML = layout;
}
