const express = require('express');
const server = express();
const fs = require('fs');
const multer  = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ dest: 'public/img' })
const db = require('./db');
const KeywordsModel = require('./models/keyword');
const PostModel = require('./models/post');
const CommentModel = require('./models/comment');
const bodyParser = require('body-parser');
const { setTimeout } = require('timers/promises');
const { count } = require('console');
const { populate } = require('./models/keyword');
const { response } = require('express');

server.use(express.static('public'));
server.set('view engine', 'ejs');
server.set('views', './views');
server.listen(3000);
server.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
server.use('/css/bootstrap.css.map', express.static('node_modules/bootstrap/dist/css/bootstrap.css.map'));
server.use('/css/bootstrap-icons.css', express.static('node_modules/bootstrap-icons/font/bootstrap-icons.css'));



server.get('/classifidecreate', (req, res) => {
    res.render('classifidecreate');
});

server.get('/', (req, res) => {
    res.render('index');
});

server.get('/classified/:id', (req, res) => {
    res.render('classifidecard');
});

server.get('/filter/:id', (req, res) => {
    res.render('index');
});

server.post('/search', uploads.none(), async (req, res) => {
    const findBy = req.body.search;
    const formatted = '/' + findBy + '/i'
    console.log(formatted)
    const data = await PostModel.find({ title: /від/i }).populate('keywords').exec();
    res.send(JSON.stringify(data))
})

server.get('/json/:id', async (req, res) => {
    
    const { id } = req.params;
    let data = await PostModel.findOne({ _id: id } ).populate('keywords').populate('comments').exec();
    let promises = 
    data.comments.map(async element => {        
        return await CommentModel.findOne({ _id: element._id }).populate('reply')       
    });
    const result = await Promise.all(promises);
    data.comments = result;    
    res.send(JSON.stringify(data)); 
});

server.get('/getAdds/', async (req, res) => {
    let data = await PostModel.find({}).populate('keywords').exec();
    data.sort((a, b) => b.createAt > a.createAt ? 1 : -1);
    res.send(JSON.stringify(data)); 
});

//filter
server.get('/getAddsfilter/:id', async (req, res) => {
    const { id } = req.params;
    const data = await PostModel.find({ keywords: id }).populate('keywords').exec();
    data.sort((a, b) => b.createAt > a.createAt ? 1 : -1);
    console.log(data)
    res.send(JSON.stringify(data)); 
});


// posting add
server.post('/postad', uploads.single('picture'), async (req, res) => {
    console.log(req.file);
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
            price: req.body.price,
            picture: req.file.filename
        });
        console.log(doc);
        const id = doc._id;
        res.redirect(`/classified/${id}`);   
    };
    //Тут логіка по додаванню нових ключових слів і отриманню ід, існуючих
    const keywordsProcess = () => {
        const keywords = JSON.parse(req.body.keywordsinput);
        let count_success = keywords.length;        
        keywords.forEach(async element => {            
            let keywordID;
            [ keywordID ] = await KeywordsModel.find({ keyword: element.value }).exec();
            if (!keywordID) {
            keywordID = await KeywordsModel.create({ keyword: element.value });  
            };
            keywordsArray.push(keywordID._id);
            count_success--;
            if(count_success == 0) {
                createPost(); 
            }             
        });        
    };
    keywordsProcess();
});
//post comment
server.post('/postcomment', bodyParser.json() , async (req, res) => {
    console.log(req.body);
    const doc = await CommentModel.create({
        author: req.body.author,
        comment: req.body.comment,
    });
    //reply
    const replyData = req.body.reply;
    if (replyData) {
        const CommentReply = await CommentModel.updateOne(
            { _id: req.body.reply },
            {
              $push: { reply: doc.id }  
            } 
        );
        console.log(CommentReply);

    } else {
        const PostUpdate = await PostModel.updateOne(
            { _id: req.body.params },
            {
              $push: { comments: doc.id }  
            } 
        );
        console.log(PostUpdate);

    }
    
    console.log(req.body.reply);
    console.log(doc._id);
    res.status(200).send('Comment created');
}); 

//getting keywords list
server.get('/keys', async (req, res) => {
    const keysList = await KeywordsModel.find({}, 'keyword').exec();
    res.send(JSON.stringify(keysList));
});

server.post('/rating', bodyParser.json(), async (req, res) => {
    console.log(req.body);
    like = req.body.like;
    let ratingValue = 0;
    if (like) {
        ratingValue = 1;
    } else {
        ratingValue = -1;
    }
    console.log(ratingValue);
    const PostUpdate = await CommentModel.updateOne(
        { _id: req.body.id },
        {
          $inc: { rating: ratingValue } 
        } 
    );
    console.log(PostUpdate);
    ratingValue = 0;
    res.status(200).send('Rating changed');
})

server.get('/reply', async (req, res) => {
    const keysList = await CommentModel.find({}).populate('reply').exec();
    res.send(JSON.stringify(keysList));
})


