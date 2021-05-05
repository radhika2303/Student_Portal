const express = require("express");
const User = require("../models/user");
const Blog = require("../models/blog");
const Router = express.Router();
const methodOverride = require("method-override")
var nodemailer = require('nodemailer');


Router.use(methodOverride('_method'))

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

Router.get("/:id/edit", async (req,res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.render("blog/edit.ejs", { blog });
})

Router.put("/:id", async (req,res)=> {
    const { id } = req.params;
    const blog = await  Blog.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    console.log(req.body)
    res.redirect("/student/blog/all")
})

Router.get("/:id/delete", async(req,res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.render("blog/delete.ejs", { blog });
})

Router.delete("/:id", async (req,res)=> {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    res.redirect("/student/blog/all")
})
module.exports = Router;