//import express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
//import mysql2 
const mysql = require('mysql2');
//mysql input checker
const inputCheck = require('./utils/inputCheck');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your MySQL username, password, and database
        user: 'root',
        password: '',
        database: 'election'
    },
    console.log('Connected to the election database.')
    );


    // Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

  // Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
  });


// // Get a single candidate
// app.get('/api/candidate/:id', (req, res) => {
//     const sql = `SELECT * FROM candidates WHERE id = ?`;
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, row) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: row
//       });
//     });
//   });

//     // Get all candidates
// app.get('/api/candidates', (req, res) => {
//     const sql = `SELECT * FROM candidates WHERE id = ?`;
    
  
//     db.query(sql, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });

// Create a candidate

// const sql = 'INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?, ?, ?, ?)';
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });



//404 status
app.use((req, res) => { 
    res.status(404).json({
        message: '404 Page Not Found'
    });
});

//express server port listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

 