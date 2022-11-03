const express = require('express');
const server = express();
const fs = require('fs');
const multer  = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ dest: 'uploads/' })
const db = require('./db');
const KeywordsModel = require('./models/keyword');
const PostModel = require('./models/post');
const CommentModel = require('./models/comment');
const bodyParser = require('body-parser');
const axios = require('axios');
const { setTimeout } = require('timers/promises');

server.set('view engine', 'ejs');
server.set('views', './views');
server.listen(3000);
server.use(express.static('public'));
server.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
server.use('/css/bootstrap.css.map', express.static('node_modules/bootstrap/dist/css/bootstrap.css.map'));
server.use('/css/bootstrap-icons.css', express.static('node_modules/bootstrap-icons/font/bootstrap-icons.css'));



server.get('/classifidecreate', (req, res) => {
    res.render('classifidecreate');
});

server.get('/', (req, res) => {
    res.render('index');
});

server.get('/classified/:id', async (req, res) => {
    res.render('classifidecard');
});

server.get('/json/:id', async (req, res) => {
    const { id } = req.params;
    const data = await PostModel.findOne({ _id: id }).populate('keywords').populate('comments').exec();
    res.send(JSON.stringify(data)); 
});

server.get('/getAdds', async (req, res) => {
    const data = await PostModel.find({}).populate('keywords').exec();
    res.send(JSON.stringify(data)); 
});



// posting add 
server.post('/postad', uploads.single('picture'), bodyParser.json() , async (req, res) => {
    let keywordsArray = [];
//creating post
    const createPost = async () => {
        const doc = await PostModel.create({
            author: req.body.author,
            phone: req.body.phone,
            location: req.body.location,
            title: req.body.title,
            content: req.body.content,
            keywords: keywordsArray,
            price: req.body.price
        });
        console.log(doc)    
    };
    //Тут логіка по додаванню нових ключових слів і отриманню ід, існуючих
    const keywordsProcess = () => {
        const keywords = req.body.keywords;
        var count_success = keywords.length;        
        keywords.forEach(async element => {
            count_success--;
            let keywordID;
            [ keywordID ] = await KeywordsModel.find({ keyword: element }).exec();
            if (!keywordID) {
            keywordID = await KeywordsModel.create({ keyword: element });  
            };
            keywordsArray.push(keywordID._id);
            if(count_success == 0) {
                createPost(); 
            }             
        });        
    };
    keywordsProcess();
});

//post comment
server.post('/postcomment', bodyParser.json() , async (req, res) => {
    const doc = await CommentModel.create({
        author: req.body.author,
        comment: req.body.comment,
    });
    const PostUpdate = await PostModel.updateOne(
        { _id: req.body.params },
        {
          $push: { comments: doc.id }  
        } 
    );
    console.log(req.body.params);
    console.log(doc._id);
    console.log(PostUpdate);
}); 

//getting keywords list
server.get('/keys', async (req, res) => {
    const keysList = await KeywordsModel.find({}, 'keyword').exec();
    res.send(JSON.stringify(keysList));
});


const init = async  () => {
    
 //   console.log('start');
 //   const doc = await KeywordsModel.create({
 //       keyword: 'вікна',
 //   });
 //   const booksList = await PostModel.find({}, ).populate('keywords');
 //   console.log(booksList);
  //  res.send(JSON.stringify(booksList));
//  635e70140ee349d5b3f7246b
 };
  init();

