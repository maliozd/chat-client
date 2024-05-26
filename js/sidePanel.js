export class SidePanel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        console.log(this.container);
    }

    render(users) {
        console.log(users)
        const sidePanelHtml = `
                <div id="sidePanel__head">Kişiler</div>
                <div id="sidePanel__interface">
                    ${users.map(user => `
                        <ul class="user" data-user-id="${user.id}">
                            <li class="user__picture">
                                <img src="${user.profilePicturePath}" alt="${user.username}">
                            </li>
                            <li class="user__name">${user.username}</li>
                            <li class="user__latestMessage">${user.latestMessage ? user.latestMessage.messageText : ""}</li>
                        </ul>
                    `).join('')}
                </div>
        `;
        this.container.innerHTML = sidePanelHtml;
    }

    addEventListeners(){
        const userElements = this.container.querySelectorAll('.user');
        userElements.forEach(element => {
            element.addEventListener('click',(e) => {
                const userId = element.dataset.userId;
                console.log(userId)
                console.log(element)
                console.log(element.dataset)
            })
        })
    }
}

