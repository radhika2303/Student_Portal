const express = require('express')
const User = require('../models/user')
const assignment = require('../models/assignment')
const Router = express.Router()
var nodemailer = require('nodemailer')

Router.get('/', (req, res) => {
  res.render('assignment/assignment.ejs')
})

Router.get('/new', (req, res) => {
  res.render('assignment/newAssignment.ejs')
})

Router.post('/new', (req, res) => {
  var A_Subject = req.body.A_Subject
  var A_Date = req.body.A_Date
  var A_Time = req.body.A_Time
  var newAssignment = { A_Date: A_Date, A_Subject: A_Subject, A_Time: A_Time }
  assignment.create(newAssignment, function (err, newassgn) {
    if (err) {
      console.log(err)
    } else {
      req.user.assignment.push(newassgn)
      //idea.save()
      req.user.save()
    }
  })
  res.redirect('/student/assignment/all')
})

Router.get('/all', (req, res) => {
  assignment.find({}, function (err, allassignments) {
    if (err) {
      console.log(err)
    } else {
      res.render('assignment/index.ejs', { assignments: allassignments })
    }
  })
})

Router.get('/:id/edit', async (req, res) => {
  const { id } = req.params
  const assignments = await assignment.findById(id)
  res.render('assignment/edit.ejs', { assignment: assignments })
})

Router.put('/:id', async (req, res) => {
  const { id } = req.params
  const assgn = await assignment.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  })
  console.log(req.body)
  res.redirect('/student/assignment/all')
})

Router.get('/:id/delete', async (req, res) => {
  const { id } = req.params
  const assignments = await assignment.findById(id)
  res.render('assignment/delete.ejs', { assignment: assignments })
})

Router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const assignments = await assignment.findByIdAndDelete(id)
  res.redirect('/student/assignment/all')
})

module.exports = Router
