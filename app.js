import { signalRConnection, startConnection } from './src/signalr.js';
import { fetchUsers } from './src/services/userService.js';
import { fetchMessages, mapUserLatestMessages, mapUserMessages } from './src/services/messageService.js';
import { EVENTS, INVOKE_FUNCTION_NAMES, RECEIVE_FUNCTION_NAMES } from './src/constants.js';
import { getCurrentUserInfo } from './src/services/valueHelper.js';
import '../src/components/messageInputComponent.js'; // MessageInputComponent import edildi
import '../src/components/sidePanelComponent.js';
import { LocalStorageHelper } from './src/db/localStoageHelper.js';

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

        ls.saveDataToLocalStorage(usersResponse, mappedUserLatestMessageData, messagesResponse.messages);
        sidePanelComponent.data = mappedUserLatestMessageData;
        messagesComponent.data = mappedUserMessagesData.messages;

        var user = getCurrentUserInfo();
        activeChattingUserComponent.data = user;

    } catch (error) {
        console.error('Error initializing data:', error);
    }
}

document.querySelector('side-panel-component').addEventListener(EVENTS.ACTIVE_USER_CHAT_CHANGED, async (event) => {
    const { activeUserId } = event.detail;
    console.log(activeUserId);

    var userMessageData = ls.getUserMessagesFromStorage(parseInt(activeUserId));
    console.log("qweqwew ",userMessageData);
    messagesComponent.data = userMessageData == null ? [] : userMessageData.messages;
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

const handleVisibilityChange = throttle(async () => {
    let isWindowVisible = document.visibilityState === "visible";
    console.log('window visible : ', isWindowVisible);
    await signalRConnection.invoke(INVOKE_FUNCTION_NAMES.WINDOW_STATE_CHANGED, isWindowVisible);
}, 5000); // 5 saniye


document.addEventListener('visibilitychange', handleVisibilityChange);



function throttle(func, limit) {
    let lastFunc;
    let lastRan;  
    
    return function(...args) { //returned function replaces the original function to apply throttling
        if (!lastRan) { // if the function not run before
            func.apply(this, args); 
            lastRan = Date.now(); // update last execution time
        } else { // if function has been run before
            clearTimeout(lastFunc); // clear previous timer 
            lastFunc = setTimeout(() => { // create new timer
                if ((Date.now() - lastRan) >= limit) { // if specified time passed
                    func.apply(this, args); // run the function 
                    lastRan = Date.now(); // update last execution time
                }
            }, limit - (Date.now() - lastRan)); // wait for remaining time in the limit
        }
    };
}

initialize();