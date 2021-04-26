const express = require("express");
const User = require("../models/user");
const Blog = require("../models/blog");
const Router = express.Router();

Router.get("/", (req,res) => {
    res.render("blog/blog.ejs")
})

Router.get("/new", (req,res) => {
    res.render("blog/newBlog.ejs");
})

Router.post("/new", (req,res) => {
    var Topic= req.body.Topic;
    var Content = req.body.Content;
    var B_Date = req.body.B_Date;
    var newBlog = {Topic: Topic,Content:Content,B_Date:B_Date};
    Blog.create(newBlog, function(err,newBlog) {
        if(err) {
            console.log(err);
        }
        else {
            req.user.blog.push(newBlog);
            //idea.save()
            req.user.save();
        }
    })
    res.redirect("/student/blog/all")
})

Router.get("/all", (req,res) => {
    Blog.find({}, function(err, allBlogs) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("blog/index.ejs", {Blogs: allBlogs});
		}
	});
})

module.exports = Router;