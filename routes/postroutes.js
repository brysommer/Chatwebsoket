const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer  = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ dest: 'public/img' });
const PostModel = require('../models/post');
const CommentModel = require('../models/comment');
const KeywordsModel = require('../models/keyword');
const bodyParser = require('body-parser');

router.post('/search', uploads.none(), async (req, res) => {
    const findBy = req.body.search;
    const formatted = '.*' + findBy + '.*'
    console.log(formatted)
    const data = await PostModel.find({ title: {$regex: formatted, $options: 'i'} }).populate('keywords').exec();
    console.log(data)
    if(data.length == 0) {
        res.render('notfind');
    } else {
        res.render('search', {data: data});
    }    
})

// posting add
router.post('/postad', uploads.single('picture'), async (req, res) => {
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
            };             
        });        
    };
    keywordsProcess();
});

//post comment
router.post('/postcomment', bodyParser.json() , async (req, res) => {
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

router.post('/rating', bodyParser.json(), async (req, res) => {
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
});

module.exports = router;