import { config } from '../config.js';
import { RECEIVE_FUNCTION_NAMES } from './constants.js';
import {  getLsToken } from './services/valueHelper.js';
export const signalRConnection = new signalR.HubConnectionBuilder()
    .withUrl(config.messageHubUrl, {
        accessTokenFactory:  () => getLsToken(),
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        headers: {
            "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
            'ngrok-skip-browser-warning': 69420,
            "credentials": 'include',
            "crossorigin": true
        }
    })
    .withAutomaticReconnect(10,20,30)
    .build();

export async function startConnection() {
    try {
        console.log("Connection starting.");
        await signalRConnection.start();
        window.signalR = signalRConnection;
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
    }
};

signalRConnection.onclose(async () => {
    console.log("reconnectiong")
    await startConnection();
});


// signalRConnection.on(RECEIVE_FUNCTION_NAMES.MESSAGE_RECEIVED, (message) => {
//     console.log(message);
//     var event = new CustomEvent(RECEIVE_FUNCTION_NAMES.MESSAGE_RECEIVED, {
//         detail: message
//     });
//     window.dispatchEvent(event);
// });

// export const messageReceived = signalRConnection.on(RECEIVE_FUNCTION_NAMES.MESSAGE_RECEIVED, (message) => {
//     const messages = JSON.parse(localStorage.getItem('messages'));
//     messages.push({
//         messageText: message.message,
//         fromName: message.from,
//         timestamp: new Date().getTime(),
//     });
//     localStorage.setItem('messages', JSON.stringify(messages));
// });
