const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    B_Name: String,
    B_Author: String,
    B_Subject: String,
})

module.exports = mongoose.model('book', bookSchema);