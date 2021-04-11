const express = require('express');
const path = require('path');
const http = require('http');
const dotenv = require('dotenv').config();
const socket = require('socket.io')



const app = express();
const server = http.createServer(app)

const io = socket(server);

app.use(express.static(path.join(__dirname, '..', 'public')));
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})

let allClients = [];

io.on('connection', socket => {
    console.log('Client connected', socket.id);
    allClients.push(socket);



    socket.on('hand-motion', data => {
        io.emit('hand-motion', {
            id: data.id,
            x: data.x,
            y: data.y
        })
    })


    socket.on('disconnect', () => {
        console.log('1 user disconnected');
        allClients.splice(allClients.indexOf(socket), 1);

    })
})