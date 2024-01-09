const express = require('express');
const app = express(); 
const http = require('http');
const server = http.createServer(app); 
const path = require('path'); 

const socket = require('socket.io');
const io = socket(server, {cors: {origin: "*"}});

app.get('*', express.static('./public'), (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', socket => {
  socket.on('message', data => {
    io.emit('message', data); 
  });
});

server.listen(3500); 
