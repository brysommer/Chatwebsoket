const mongoose = require("mongoose");
const { Schema } = mongoose;


// валідація не працює
const generalSchema = new Schema({
    keyword: {
        type: Schema.Types.String,
        minLenght: 3,
        maxLenght: 10,
  //      lowercase: true,
        index: true,
        unique: true,
    },
    post: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Posts' }],
});

const model = mongoose.model('Keywords', generalSchema);
module.exports = model;