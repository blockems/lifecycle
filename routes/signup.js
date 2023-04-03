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

// Signup form
router.get('/', (req, res) => {
  res.render('signup', { title: 'Sign up' });
});

// Signup action
router.post('/', (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (username && password && confirmPassword) {
    if (password === confirmPassword) {
      // Hash password before storing in database
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Internal server error');
        } else {
          db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
            if (err) {
              console.error(err.message);
              res.status(500).send('Internal server error');
            } else {
              res.redirect('/login');
            }
          });
        }
      });
    } else {
      res.render('signup', { title: 'Sign up', error: 'Passwords do not match' });
    }
  } else {
    res.render('signup', { title: 'Sign up', error: 'Please enter a username and password' });
  }
});

module.exports = router;
