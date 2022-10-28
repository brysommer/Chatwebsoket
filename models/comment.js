const mongoose = require("mongoose");
const { Schema } = mongoose;

const generalSchema = new Schema({
    comment: {
        type: Schema.Types.String,
        minLenght: 5,
        required: [true, 'Надто коротко для коментаря']
    },
    author: {
        type: Schema.Types.String,
        minLenght: 3,
        required: [true, 'Будь ласка представтеся']

    },
    createAt: {
        type: Schema.Types.Date,
        default: Date.now,
    },
    rating: {
        type: Schema.Types.Number,
        default: 0,
    },
    reply: [{
        type: Schema.Types.ObjectId,
    }]
});

const model = mongoose.model('Comments', generalSchema);
module.exports = model;