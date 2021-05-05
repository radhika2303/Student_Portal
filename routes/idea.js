const express = require('express')
const User = require('../models/user')
const Idea = require('../models/idea')
const Router = express.Router()
const methodOverride = require('method-override')
var nodemailer = require('nodemailer')

Router.use(methodOverride('_method'))

Router.get('/new', (req, res) => {
  res.render('idea/newIdea.ejs')
})

Router.post('/new', (req, res) => {
  var Topic = req.body.Topic
  var Pre_req = req.body.Pre_req
  var N_People = req.body.N_People
  var newIdea = { Topic: Topic, Pre_req: Pre_req, N_People: N_People }
  Idea.create(newIdea, function (err, newidea) {
    if (err) {
      console.log(err)
    } else {
      req.user.ideas.push(newidea)
      //idea.save()
      req.user.save()
    }
  })
  res.redirect('/student/idea/all')
})

Router.get('/all', (req, res) => {
  Idea.find({}, function (err, allIdeas) {
    if (err) {
      console.log(err)
    } else {
      res.render('idea/index.ejs', { Ideas: allIdeas })
    }
  })
})

Router.get('/:id/edit', async (req, res) => {
  const { id } = req.params
  const idea = await Idea.findById(id)
  res.render('idea/edit.ejs', { idea })
})

Router.put('/:id', async (req, res) => {
  const { id } = req.params
  const idea = await Idea.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  })
  console.log(req.body)
  res.redirect('/student/idea/all')
})

Router.get('/:id/delete', async (req, res) => {
  const { id } = req.params
  const idea = await Idea.findById(id)
  res.render('idea/delete.ejs', { idea })
})

Router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const idea = await Idea.findByIdAndDelete(id)
  res.redirect('/student/idea/all')
})

module.exports = Router
