import { connection, startConnection } from './signalr.js';
import { fetchUsers } from './services/userService.js';
import { fetchMessages, sendMessage } from './services/messageService.js';
import { config } from './config.js';
import {SidePanel} from './sidePanel.js'


document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/layouts/layout.html');
    const layout = await response.text();
    document.getElementById('canvas').innerHTML = layout;

    const userResponse = await fetchUsers();
    const messagesResponse = await fetchMessages();

    console.log(userResponse);
    console.log(messagesResponse);

    const sidePanelData = userResponse.map(user => {
        const latestMessage = messagesResponse
            .filter(message => message.fromId === user.id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        return { ...user, latestMessage };
    });

    console.log(sidePanelData);


    localStorage.setItem('messages', JSON.stringify(sidePanelData));
    localStorage.setItem('sidePanel_Data', JSON.stringify(userResponse));

    await startConnection();
    renderPage();


    const sidePanel = new SidePanel('sidePanelDiv');
    sidePanel.render(sidePanelData);

    const inputField = document.getElementById('txtChatInput');
    inputField.addEventListener('keypress', handleEnterKeyPress);
});

const handleEnterKeyPress = async (event) => {
    if (event.key === 'Enter') {
        const inputField = document.getElementById('txtChatInput');
        const message = {
            messageText: inputField.value,
            fromUserId: config.USER_ID,
            toUserId: 7,
        };

        await sendMessage(message);

        const newMessage = {
            message: inputField.value,
            fromName: 'alperen31',
            fromId: config.USER_ID,
            timestamp: new Date().getTime(),
        };

        inputField.value = null;
        addMessage(newMessage);
    }
};

const addMessage = async (message) => {
    const messages = JSON.parse(localStorage.getItem('messages'));
    messages.push({
        messageText: message.message,
        fromName: message.fromName,
        fromId: message.fromId,
        timestamp: new Date().getTime(),
    });
    localStorage.setItem('messages', JSON.stringify(messages));
    await renderPage();
};

async function renderPage() {
    console.log('rendering');
    let deviceWidth = window.innerWidth;
    let deviceHeight = window.innerHeight;

    document.body.style.setProperty('--deviceWidth', `${deviceWidth}px`);
    document.body.style.setProperty('--deviceHeight', `${deviceHeight}px`);

    let messagelist = document.querySelector('.messages__list');
    let messageEach = document.querySelector('.message');

    const messages = JSON.parse(localStorage.getItem('messages'));
    messagelist.innerHTML = '';

    

    messages.forEach(r => {
        let messageNode = messageEach.cloneNode(true);
        messageNode.innerHTML = r.messageText;

        if (config.USER_ID == r.fromId) {
            messageNode.style.alignSelf = 'flex-end';
        }

        messagelist.appendChild(messageNode);
    });
    messagelist.scrollTop = messagelist.scrollHeight;
}

function parseTimestamp(timestamp) {
    const [datePart, timePart] = timestamp.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
}
