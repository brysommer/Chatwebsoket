const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = express();
const fs = require('fs');
//const db = require('./db');
//const getRoutes = require('./routes/getroutes');
//const postRoutes = require('./routes/postroutes');
const httpServer = createServer(server);
const io = new Server(httpServer, { /* options */ });
var ss = require('socket.io-stream');
var path = require('path');

let chat = [];
let usersName = [];
io.on('connection', (socket) => {
  io.sockets.emit('chatreload', { chat, usersName });
  console.log('wsserver ON', socket.id);
  socket.on('name', (data) => {
    console.log('Name: ' + data);
    usersName.push({UID: socket.id, name: data});
    console.log(usersName)
  })
  socket.on('chat', (data, cb) => {
    console.log('DATA:', data);
    let massage = {
      id: socket.id,
      massage: data.message,
      time: data.time, 
      }
    chat.push(massage)
    console.log(chat)
    cb(massage.id);
    io.sockets.emit('chatreload', { chat, usersName });
  })
  //websocket file upload
  ss(socket).on('file', function(stream, name) {
    let filename = path.basename(name);
    stream.pipe(fs.createWriteStream(filename));
  });
});
httpServer.listen(3000);

server.use(express.static('public'));
server.set('view engine', 'ejs');
server.set('views', './views');
//server.listen(3000);
server.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
server.use('/css/bootstrap.css.map', express.static('node_modules/bootstrap/dist/css/bootstrap.css.map'));
server.use('/css/bootstrap-icons.css', express.static('node_modules/bootstrap-icons/font/bootstrap-icons.css'));
//server.use(getRoutes);
//server.use(postRoutes);

server.use('/chat', (req, res) => {
  res.render('chat');
})




