const express = require("express");
const User = require("../models/user");
const Book = require("../models/book");
const Router = express.Router();

Router.get("/", (req,res) => {
    res.render("book/book.ejs")
})

Router.get("/new", (req,res) => {
    res.render("book/newBook.ejs");
})

Router.post("/new", (req,res) => {
    var B_Name= req.body.B_Name;
    var B_Author = req.body.B_Author;
    var B_Subject = req.body.B_Subject;
    var newBook = {B_Name:B_Name,B_Author:B_Author,B_Subject:B_Subject};
    Book.create(newBook, function(err,newBook) {
        if(err) {
            console.log(err);
        }
        else {
            req.user.books.push(newBook);
            //idea.save()
            req.user.save();
        }
    })
    res.redirect("/student/book/all")
})

Router.get("/all", (req,res) => {
    Book.find({}, function(err, allBooks) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("book/index.ejs", {Books: allBooks});
		}
	});
})

module.exports = Router;