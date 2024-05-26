import { GetToken, config } from './config.js';
import { RECEIVE_FUNCTION_NAMES } from './constants.js';
export const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:8080/hubs/messagehub", {
        accessTokenFactory: async () => GetToken(),
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
