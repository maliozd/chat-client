
export function getChattingUserId() {
    return parseInt(document.getElementById('txtChatInput').getAttribute('selectedUserID'))
}

export function setChattingUserId(userId) {
    document.getElementById('txtChatInput').setAttribute('selectedUserID', userId);
}

export function getCurrentUserId() {

    /*    // console.log(token);

        var token = getLsToken();
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            var payload = JSON.parse(jsonPayload);
            */
    var token = getLsToken();
    var payload = JSON.parse(atob(token.split('.')[1]));
    var id = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    return id;
}

export function getLsToken() {
    return localStorage.getItem('access-token');
}

function parseTimestamp(timestamp) {
    const [datePart, timePart] = timestamp.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
}