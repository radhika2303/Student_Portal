const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
    Topic: String,
    Pre_req: String,
    N_People: String,
})

module.exports = mongoose.model('Idea', ideaSchema);