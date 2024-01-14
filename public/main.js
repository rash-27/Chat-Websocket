const socket = io();

const clientsTotal = document.getElementById('clients-total');

const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');


window.addEventListener('load', (e) => {
    const name = prompt("What is your name?");
    if(name === null || name === ""){
        console.log("Name is null");
        e.preventDefault();
        nameInput.value = "Anonymous";
    }else 
    {nameInput.value = name;}
    messageContainer.innerHTML = "";
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});
socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total clients: ${data}`;
});


function sendMessage() {
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        date : new Date()
    };
    if(data.message === "") return;
    socket.emit('message', data);
    addMesagetoUI(true, data);
    messageInput.value = "";

}

socket.on('chat-message', (data) => {
    addMesagetoUI(false, data);
})


function addMesagetoUI(isOwnMessage, data) {
    cleaFeedback();
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

messageInput.addEventListener('focus',(e)=>{
    socket.emit('feedback',{
        feedback : ` ✍️ ${nameInput.value} is typing a message...`
    });
})

messageInput.addEventListener('keypress',(e)=>{
    socket.emit('feedback',{
        feedback : ` ✍️ ${nameInput.value} is typing a message...`
    });
})
messageInput.addEventListener('blur',(e)=>{
    socket.emit('feedback',{
        feedback : ""
    });
})

socket.on('feedback',(data)=>{
    cleaFeedback();
    const element = `
    <li class="message-feedback">
        <p class="feedback">
            ${data.feedback}
        </p>
    </li>
    `;
    messageContainer.innerHTML+= element;
    scrollToBottom();
})


function cleaFeedback(){
    document.querySelectorAll('li.message-feedback').forEach((element)=>{
        element.parentNode.removeChild(element);
    });
}