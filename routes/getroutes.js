const express = require('express')
const router = express.Router()
const PostModel = require('../models/post');
const CommentModel = require('../models/comment');
const KeywordsModel = require('../models/keyword');


router.get('/classifidecreate', (req, res) => {
    res.render('classifidecreate');
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/classified/:id', (req, res) => {
    res.render('classifidecard');
});

router.get('/filter/:id', (req, res) => {
    res.render('index');
});

router.get('/json/:id', async (req, res) => {
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

router.get('/getAdds/', async (req, res) => {
    let data = await PostModel.find({}).populate('keywords').exec();
    data.sort((a, b) => b.createAt > a.createAt ? 1 : -1);
    res.send(JSON.stringify(data)); 
});

//filter
router.get('/getAddsfilter/:id', async (req, res) => {
    const { id } = req.params;
    const data = await PostModel.find({ keywords: id }).populate('keywords').exec();
    data.sort((a, b) => b.createAt > a.createAt ? 1 : -1);
    console.log(data)
    res.send(JSON.stringify(data)); 
});

//getting keywords list
router.get('/keys', async (req, res) => {
    const keysList = await KeywordsModel.find({}, 'keyword').exec();
    res.send(JSON.stringify(keysList));
});

router.get('/reply', async (req, res) => {
    const keysList = await CommentModel.find({}).populate('reply').exec();
    res.send(JSON.stringify(keysList));
})

module.exports = router;





