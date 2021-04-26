const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    Q_Subject: String,
    Q_Time: String,
    Q_Date: Date,
    Q_Duration: String
})

module.exports = mongoose.model('quiz', quizSchema);