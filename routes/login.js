const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Login form
router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Login action
router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else if (!row) {
        res.render('login', { title: 'Login', error: 'Invalid username or password' });
      } else {
        bcrypt.compare(password, row.password, (err, result) => {
          if (result === true) {
            req.session.userId = row.id;
            res.redirect('/');
          } else {
            res.render('login', { title: 'Login', error: 'Invalid username or password' });
          }
        });
      }
    });
  } else {
    res.render('login', { title: 'Login', error: 'Please enter a username and password' });
  }
});

module.exports = router;
