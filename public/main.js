const socket = io();
const clientsTotal = document.getElementById('clients-total');

const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');


messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});
socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total clients: ${data}`;
});


function sendMessage() {
    if(data.message === "") return;
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        date : new Date()
    };
    socket.emit('message', data);
    addMesagetoUI(true, data);
    messageInput.value = "";

}

socket.on('chat-message', (data) => {
    addMesagetoUI(false, data);
})


function addMesagetoUI(isOwnMessage, data) {
    const element = `
    <li class="${isOwnMessage ? "message-right" : "message-left"}">
        <p class="message">
            ${data.message}
            <span>${data.name} ❤️</span>
        </p>
    </li>
    `;
    messageContainer.innerHTML+= element;
    scrollToBottom();
}


function scrollToBottom(){
    messageContainer.scrollTo(0,messageContainer.scrollHeight)
}