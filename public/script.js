//connect to the Socket.IO server
const socket = io();

//grab DOM elements for chat functionality
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const typingStatus = document.getElementById('typing-status');
const userList = document.getElementById('user-list');

//prompt user for a nickname (repeats until non-empty)
let nickname = '';
while (!nickname) {
    nickname = prompt("Enter your nickname").trim();
}

//send the nickname to the server to register this user
socket.emit('set nickname', nickname);

//timeout ID for typing indicator
let typingTimeout;

//sanitize input to prevent XSS attacks
function sanitize(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

//emit "typing" event while user is typing, with a short delay before "stop typing"
input.addEventListener('input', () => {
    socket.emit('typing');
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => socket.emit('stop typing'), 1000);
});

//when form is submitted, send the message and update UI
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        //show your own message in the UI
        const item = document.createElement('li');
        item.textContent = `You: ${sanitize(input.value)}`;
        item.classList.add('own-message');
        messages.appendChild(item);

        //emit the message to the server
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

//when a chat message is received from another user, display it
socket.on('chat message', ({ user, msg }) => {
    const item = document.createElement('li');
    item.textContent = `${sanitize(user)}: ${sanitize(msg)}`;
    messages.appendChild(item);

    //auto-scroll to bottom
    messages.scrollTop = messages.scrollHeight;
});

//show typing indicator when someone is typing
socket.on('typing', user => {
    typingStatus.textContent = `${user} is typing...`;
});

//clear typing indicator when they stop
socket.on('stop typing', () => {
    typingStatus.textContent = '';
});

//update the list of online users
socket.on('user list', users => {
    userList.innerHTML = `Online (${users.length}): ${users.join(', ')}`;
});

