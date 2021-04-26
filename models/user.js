var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    F_Name: String,
    M_Name: String,
    L_Name: String,
    Year: String,
    Branch: String,
    Street_Name: String,
    Street_No: String,
    ideas:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Idea",
    }],
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
    }],
    assignment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assignment',
    }],
    quiz:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quiz',
    }],
    blog:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
    }],
    password: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);