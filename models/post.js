const mongoose = require("mongoose");
const { Schema } = mongoose;

const generalSchema = new Schema({
    author: {
        type: Schema.Types.String,
        required: [true, 'Представтесь, так буде зрозуміло як до Вас звертатись']

    },
    phone: {
        type: Schema.Types.String,
        minLenght: 10,
        maxLenght: 10,

    },
    location: {
        type: Schema.Types.String,
        required: [true, 'Покупцям буде корисно знати де знаходиться товар']


    },
    title: {
        type: Schema.Types.String,
        required: [true, 'Заголовок дозволить зрозуміти що ви пропонуєте'],
        minLenght: 10,
        maxLenght: 50,

    },

    content: {
        type: Schema.Types.String,
        minLenght: 5,
        maxLenght: 280,
        required: [true, 'Опишіть товар, це допоможе вашим клієтам']

    },
    picture: {
        type: Schema.Types.String,
        default: '3',      
    },
    keywords: [{
        type: Schema.Types.ObjectId,
        ref: 'Keywords',
        required: [true, 'Додайте хоча б одне ключове слово']
    }],
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comments' }],
    price: {
        type: Schema.Types.Number,
        min: 1,
        max: 1000000000,
        required: [true, 'Вкажіть ціну']
    }
}, { timestamps: true });

const model = mongoose.model('Posts', generalSchema);
module.exports = model;