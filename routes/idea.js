const express = require("express");
const User = require("../models/user");
const Idea = require("../models/idea");
const Router = express.Router();


Router.get("/new", (req,res) => {
    res.render("idea/newIdea.ejs");
})

Router.post("/new", (req,res) => {
    var Topic= req.body.Topic;
    var Pre_req = req.body.Pre_req;
    var N_People = req.body.N_People;
    var newIdea = {Topic: Topic,Pre_req:Pre_req,N_People:N_People};
    Idea.create(newIdea, function(err,newidea) {
        if(err) {
            console.log(err);
        }
        else {
            req.user.ideas.push(newidea);
            //idea.save()
            req.user.save();
        }
    })
    res.redirect("/student/idea/all")
})

Router.get("/all", (req,res) => {
    Idea.find({}, function(err, allIdeas) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("idea/index.ejs", {Ideas: allIdeas});
		}
	});
})

module.exports = Router;