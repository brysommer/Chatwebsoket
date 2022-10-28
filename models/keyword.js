const mongoose = require("mongoose");
const { Schema } = mongoose;

const generalSchema = new Schema({
    keyword: {
        type: Schema.Types.String,
        minLenght: 2,
    },
    adds: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Posts' }],
});

const model = mongoose.model('Keywords', generalSchema);
module.exports = model;