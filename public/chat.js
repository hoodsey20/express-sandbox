const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('.chat-input');
const status = document.querySelector('.chat-status');
const chatList = document.querySelector('.chat-list');

const socket = io.connect('http://localhost');

function addMessage(msgText) {
    const msg = document.createElement('LI');
    msg.innerText = msgText;
    chatList.appendChild(msg);
}

socket.on('ready', data => {
    status.innerHTML = 'ON AIR';
    // socket.emit('my other event', { my: 'data' });
});

socket.on('chat', data => {
    addMessage(data);
})

chatForm.addEventListener('submit', evt => {
    evt.preventDefault();
    socket.emit('chat', chatInput.value)
    chatInput.value = '';
})