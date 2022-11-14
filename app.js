const express = require('express');
const server = express();
const fs = require('fs');
const db = require('./db');
const getRoutes = require('./routes/getroutes');
const postRoutes = require('./routes/postroutes');

server.use(express.static('public'));
server.set('view engine', 'ejs');
server.set('views', './views');
server.listen(3000);
server.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
server.use('/css/bootstrap.css.map', express.static('node_modules/bootstrap/dist/css/bootstrap.css.map'));
server.use('/css/bootstrap-icons.css', express.static('node_modules/bootstrap-icons/font/bootstrap-icons.css'));
server.use(getRoutes);
server.use(postRoutes);





