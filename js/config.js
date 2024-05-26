export const config = {
    API_BASE_URL: "http://localhost:8080/api",
};
export function GetToken() {
  return localStorage.getItem('access-token');  
} 