var express = require('express')
const path = require('path')
let app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport')
var localStrategy = require('passport-local')
var User = require('./models/user.js')
var IdeaRoutes = require('./routes/idea')
var AssignmentRoutes = require('./routes/assignment')
var BlogRoutes = require('./routes/blog')
var BookRoutes = require('./routes/book')
var QuizRoutes = require('./routes/quiz')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

//APP CONFIG
app.use(
  require('express-session')({
    secret: 'Rusty is the best and cutest dog in the world',
    resave: false,
    saveUninitialized: false,
  }),
)

mongoose.connect('mongodb://localhost:27017/project', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database Connected')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})

var publicPath = path.join(__dirname, '/views')

app.use(express.static(publicPath))
app.use('/student/idea', IdeaRoutes)
app.use('/student/assignment', AssignmentRoutes)
app.use('/student/blog', BlogRoutes)
app.use('/student/quiz', QuizRoutes)
app.use('/student/book', BookRoutes)

app.get('/', function (req, res) {
  res.render('index.ejs')
})

//show signup form
app.get('/login', function (req, res) {
  res.render('login.ejs')
})

//login POST route
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/student',
    failureRedirect: '/login',
  }),
  function (req, res) {},
)

//show signup form
app.get('/register', function (req, res) {
  res.render('register.ejs')
})

//handling user sign up
app.post('/register', function (req, res) {
  User.register(
    new User({
      username: req.body.username,
      F_Name: req.body.F_Name,
      M_Name: req.body.M_Name,
      L_Name: req.body.L_Name,
      Year: req.body.Year,
      Branch: req.body.Branch,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err)
        return res.render('register')
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect('/student')
      })
    },
  )
})

app.get('/student', isLoggedIn, (req, res) => {
  res.render('student.ejs')
})

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

app.listen(7000, function () {
  console.log('Server is up on port 7000')
})
