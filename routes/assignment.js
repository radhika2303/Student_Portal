const express = require("express");
const User = require("../models/user");
const assignment = require("../models/assignment");
const Router = express.Router();

Router.get("/", (req,res) => {
    res.render("assignment/assignment.ejs")
})

Router.get("/new", (req,res) => {
    res.render("assignment/newAssignment.ejs");
})

Router.post("/new", (req,res) => {
    var A_Subject= req.body.A_Subject;
    var A_Date = req.body.A_Date;
    var A_Time = req.body.A_Time;
    var newAssignment = {A_Date:A_Date, A_Subject:A_Subject,A_Time:A_Time};
    assignment.create(newAssignment, function(err,newassgn) {
        if(err) {
            console.log(err);
        }
        else {
            req.user.assignment.push(newassgn);
            //idea.save()
            req.user.save();
        }
    })
    res.redirect("/student/assignment/all")
})

Router.get("/all", (req,res) => {
    assignment.find({}, function(err, allassignments) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("assignment/index.ejs", {assignments: allassignments});
		}
	});
})

module.exports = Router;