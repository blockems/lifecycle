const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database('./data/database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Check if user is logged in
const authMiddleware = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

// Routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

// Set up EJS as view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use partials in EJS views
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

// Home page with clickable canvas objects
app.get('/', authMiddleware, (req, res) => {
  res.render('home', { title: 'Home' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
