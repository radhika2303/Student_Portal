const express = require("express");
const User = require("../models/user");
const Quiz = require("../models/quiz");
const Router = express.Router();

Router.get("/", (req,res) => {
    res.render("quiz/quiz.ejs")
})

Router.get("/new", (req,res) => {
    res.render("quiz/newquiz.ejs");
})

Router.post("/new", (req,res) => {
    var Q_Subject= req.body.Q_Subject;
    var Q_Time = req.body.Q_Time;
    var Q_Date = req.body.Q_Date;
    var Q_Duration = req.body.Q_Duration;
    var newQuiz = {Q_Subject:Q_Subject, Q_Date:Q_Date, Q_Time:Q_Time,Q_Duration:Q_Duration};
    Quiz.create(newQuiz, function(err,newquiz) {
        if(err) {
            console.log(err);
        }
        else {
            req.user.quiz.push(newquiz);
            //idea.save()
            req.user.save();
        }
    })
    res.redirect("/student/quiz/all")
})

Router.get("/all", (req,res) => {
    Quiz.find({}, function(err, allquizzes) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("quiz/index.ejs", {quiz: allquizzes});
		}
	});
})

module.exports = Router;