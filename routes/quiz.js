const express = require("express");
const User = require("../models/user");
const Quiz = require("../models/quiz");
const Router = express.Router();
var nodemailer = require('nodemailer');


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

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'muskanparyani007@gmail.com',
          pass: 'deepakbaba'
        }
      });
      
      var mailOptions = {
        from: 'muskanparyani007@gmail.com',
        to: 'muskanparyani007@gmail.com',
        subject: 'Quiz Published',
        text: 'Your Upcoming Quiz is recorded on Student Portal'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

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

Router.get("/:id/edit", async (req,res) => {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    res.render("quiz/edit.ejs", { quiz });
})

Router.put("/:id", async (req,res)=> {
    const { id } = req.params;
    const quiz = await  Quiz.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    console.log(req.body)
    res.redirect("/student/quiz/all")
})


Router.get("/:id/delete", async(req,res) => {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    res.render("quiz/delete.ejs", { quiz });
})

Router.delete("/:id", async (req,res)=> {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);
    res.redirect("/student/quiz/all")
})

module.exports = Router;