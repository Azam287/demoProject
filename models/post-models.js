const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: String,
    text: String,
});

const User = mongoose.model('post', postSchema);

module.exports = User;
