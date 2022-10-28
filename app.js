const express = require('express');
const server = express();
//const multer  = require('multer')
//const storage = multer.memoryStorage();
//const uploads = multer({storage});
const db = require('./db');
//const GenreModel = require('./models/ganre');
//const BookModel = require('./models/storybook');
//const CommentModel = require('./models/comment');

server.set('view engine', 'ejs');
server.set('views', './views');
server.listen(3000);
server.use(express.static('public'));
server.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));

server.get('/', (req, res) => {
    res.render('main');
})