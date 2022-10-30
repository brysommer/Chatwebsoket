const express = require('express');
const server = express();
//const multer  = require('multer')
//const storage = multer.memoryStorage();
//const uploads = multer({storage});
const db = require('./db');
const KeywordsModel = require('./models/keyword');
const PostModel = require('./models/post');
//const CommentModel = require('./models/comment');
const bodyParser = require('body-parser');
server.set('view engine', 'ejs');
server.set('views', './views');
server.listen(3000);
server.use(express.static('public'));
server.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
server.use('/css/bootstrap.css.map', express.static('node_modules/bootstrap/dist/css/bootstrap.css.map'));


server.get('/', (req, res) => {
    res.render('main');
})

// posting add 
server.post('/postad', bodyParser.json() , async (req, res) => {
    const [ keywordID ] = await KeywordsModel.find({ keyword: req.body.keywords }).exec();
    console.log(keywordID._id);
    const doc = await PostModel.create({
        author: req.body.author,
        phone: req.body.phone,
        location: req.body.location,
        title: req.body.title,
        content: req.body.content,
        keywords: [ keywordID._id ],
        price: req.body.price
    });
    console.log(doc);
});
//[Object: null prototype] { genreName: 'Лалала' }

//getting keywords list
server.get('/keys', async (req, res) => {
    const keysList = await KeywordsModel.find({}, 'keyword').exec();
    res.send(JSON.stringify(keysList));
})

const init = async  () => {
    console.log('start');
    const doc = await KeywordsModel.create({
        keyword: 'Трава',
    });
    const booksList = await PostModel.find({}, ).populate('keywords');
    console.log(booksList);
    res.send(JSON.stringify(booksList));

    console.log(doc);
 };
 // init();