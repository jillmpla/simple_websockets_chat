const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

//serve static files from the "public" folder
app.use(express.static('public'));

//store connected users with their socket ID as the key
let users = {};

//handle socket connection
io.on('connection', (socket) => {

    //when a user sets a nickname, save it and notify others
    socket.on('set nickname', (nickname) => {
        users[socket.id] = nickname;

        //send updated user list to all clients
        io.emit('user list', Object.values(users));

        //broadcast a system message to others about the new user
        socket.broadcast.emit('chat message', {
            user: 'System',
            msg: `${nickname} has joined the chat.`
        });
    });

    //when a user sends a chat message, broadcast it to others
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', {
            user: users[socket.id],
            msg
        });
    });

    //notify others that a user is typing
    socket.on('typing', () => {
        socket.broadcast.emit('typing', users[socket.id]);
    });

    //notify others when a user stops typing
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', users[socket.id]);
    });

    //handle user disconnection
    socket.on('disconnect', () => {
        const name = users[socket.id];
        if (name) {
            //broadcast system message that user left
            socket.broadcast.emit('chat message', {
                user: 'System',
                msg: `${name} has left the chat.`
            });

            //remove user from the list and update everyone
            delete users[socket.id];
            io.emit('user list', Object.values(users));
        }
    });
});

//start the server on the specified port or default to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


