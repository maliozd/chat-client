import { GetToken } from "../config.js";

export function getChattingUserId() {
    return parseInt(document.getElementById('txtChatInput').getAttribute('selectedUserID'))
}

export function setChattingUserId(userId) {
    document.getElementById('txtChatInput').setAttribute('selectedUserID', userId);
}

export function getMyId() {

    /*    // console.log(token);
        // var token = GetToken();
        // var base64Url = token.split('.')[1];
        // var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            // }).join(''));
            
            // var payload = JSON.parse(jsonPayload);
            */
     var token = GetToken();
    var payload = JSON.parse(atob(token.split('.')[1]));
    var id = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    console.log("my id : ", id);
    return id;
}