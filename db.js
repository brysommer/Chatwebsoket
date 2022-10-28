const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/adds';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(uri, options);


const db = mongoose.connection;
module.exports = db;
