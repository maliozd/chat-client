import { config } from '../config.js';
import { RECEIVE_FUNCTION_NAMES } from './constants.js';
import { getLsToken } from './services/valueHelper.js';
export const connection = new signalR.HubConnectionBuilder()
    .withUrl(config.messageHubUrl, {
        accessTokenFactory: async () => getLsToken(),
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        headers: {
            "Access-Control-Allow-Origin": "http://127.0.0.1:8080",
            'ngrok-skip-browser-warning': 69420,
            "credentials": 'include',
            "crossorigin": true
        }
    })
    .withAutomaticReconnect(10)
    .build();

export async function startConnection() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
    }
};

connection.onclose(async () => {
    // await startConnection();
});

export const messageReceived = connection.on(RECEIVE_FUNCTION_NAMES.MESSAGE_RECEIVED, (message) => {
    const messages = JSON.parse(localStorage.getItem('messages'));
    messages.push({
        messageText: message.message,
        fromName: message.from,
        timestamp: new Date().getTime(),
    });
    localStorage.setItem('messages', JSON.stringify(messages));
    render();
});

export function invoke(invokeFunctionName, args) {
    console.log(invokeFunctionName)
    connection.invoke(invokeFunctionName, args);
}