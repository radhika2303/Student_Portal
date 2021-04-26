const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    Topic: String,
    Content: String,
    B_Date: String,
})

module.exports = mongoose.model('blog', blogSchema);