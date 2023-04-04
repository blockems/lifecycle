const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Home page
router.get('/', (req, res) => {
  res.render('index', { title: 'My App', user: req.session.user});
});

router.get('/canvas', function(req, res) {
  if (!req.session.user) {
    // User is not logged in
    let items = [
      {
        id: 0,
        x: 50,
        y: 50,
        width: 200,
        height: 100,
        radius: 10,
        content: "Not Logged In"
      }];
    res.json(items);
    return;
  }


  // Open the SQLite database
  let db = new sqlite3.Database('./data/database.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });

  // Define the SQL query to retrieve the items
  let sql = `SELECT * FROM items where companyid = ${req.session.companyid}`;

  // Execute the query and retrieve the results as an array of objects
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }

    // Create an array of objects with the items' properties
    let items = rows.map((row) => {
      return {
        id: row.id,
        x: row.x,
        y: row.y,
        width: row.width,
        height: row.height,
        radius: row.radius,
        img: row.img
      };
    });

    // Return the items as a JSON object
    res.json({ items });

    // Close the database connection
    db.close();
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
