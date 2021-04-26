const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    A_Subject: String,
    A_Time: String,
    A_Date: Date,
})

module.exports = mongoose.model('assignment', assignmentSchema);