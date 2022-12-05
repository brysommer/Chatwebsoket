const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = express();
const fs = require('fs');
const db = require('./db');
const getRoutes = require('./routes/getroutes');
const postRoutes = require('./routes/postroutes');
const httpServer = createServer(server);
const io = new Server(httpServer, { /* options */ });
io.on("connection", (socket) => {
  console.log('wsserver ON');
  socket.on('chat', (data) => {
    console.log('DAATAS:', data);
  })
});
httpServer.listen(3000);

server.use(express.static('public'));
server.set('view engine', 'ejs');
server.set('views', './views');
//server.listen(3000);
server.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
server.use('/css/bootstrap.css.map', express.static('node_modules/bootstrap/dist/css/bootstrap.css.map'));
server.use('/css/bootstrap-icons.css', express.static('node_modules/bootstrap-icons/font/bootstrap-icons.css'));
server.use(getRoutes);
server.use(postRoutes);

server.use('/chat', (req, res) => {
  res.render('chat');
})





