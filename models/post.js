const mongoose = require("mongoose");
const { Schema } = mongoose;

const generalSchema = new Schema({
    author: {
        type: Schema.Types.String,
    },
    phone: {
        type: Schema.Types.String,

    },
    mail: {
        type: Schema.Types.String,

    },
    location: {
        type: Schema.Types.String,

    },
    createat: {
        type: Schema.Types.Date,
        default: Date.now,
    },
    title: {
        type: Schema.Types.String,

    },

    content: {
        type: Schema.Types.String,
        minLenght: 2,
        maxLenght: 280,
    },
    picture: {
        
    },
    keywords: [{
        type: Schema.Types.ObjectId,
        ref: 'Keywords',
    }],
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comments' }],
});

const model = mongoose.model('Posts', generalSchema);
module.exports = model;