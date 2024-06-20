// export const config = {
//     API_BASE_URL: "http://localhost:8080/api",
//     BASE_URL: "http://localhost:8080",
//     messageHubUrl: "http://localhost:8080/hubs/messagehub",
// };
// https://5862-85-100-65-13.ngrok-free.app/
//ngrok
const baseUrl = "https://1b83-85-99-176-51.ngrok-free.app/"

export const config = {
    BASE_URL: baseUrl,
    API_BASE_URL: `${baseUrl}api`,
    messageHubUrl: `${baseUrl}hubs/messagehub`,
};