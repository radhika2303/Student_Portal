const express = require("express");
const User = require("../models/user");
const Book = require("../models/book");
const Router = express.Router();
const methodOverride = require("method-override")
var nodemailer = require('nodemailer');


Router.use(methodOverride('_method'))

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
        subject: 'Book Information Published',
        text: 'Your information about Books was recorded on Student Portal'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
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

Router.get("/:id/edit", async (req,res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render("book/edit.ejs", { book });
})

Router.put("/:id", async (req,res)=> {
    const { id } = req.params;
    const book = await  Book.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    console.log(req.body)
    res.redirect("/student/book/all")
})

Router.get("/:id/delete", async(req,res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render("book/delete.ejs", { book });
})

Router.delete("/:id", async (req,res)=> {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    res.redirect("/student/book/all")
})
module.exports = Router;