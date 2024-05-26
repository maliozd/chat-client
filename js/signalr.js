import { config } from './config.js';

export const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:7145/hubs/messagehub", {
        accessTokenFactory: async () => config.TOKEN,
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        headers: {
            "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
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

export const messageReceived = connection.on("MessageReceived", (message) => {
    const messages = JSON.parse(localStorage.getItem('messages'));
    messages.push({
        messageText: message.message,
        fromName: message.from,
        timestamp: new Date().getTime(),
    });
    localStorage.setItem('messages', JSON.stringify(messages));
    render();
});
