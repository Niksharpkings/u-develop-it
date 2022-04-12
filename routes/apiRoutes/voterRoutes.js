//import Express
const express = require('express');
const router = express.Router();

//import database connection
const db = require('../../db/connection');

//import inputChecker
const inputCheck = require('../../utils/inputCheck');

//get all voters

router.get('/voters', (req, res) => {
    const sql = `SELECT * FROM voters ORDER BY last_name`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({
                message: 'Error connecting to DB'
            });
            return;
        }
        res.json({
            message: 'Voters get retrieved successfully',
            data: rows,
        });
    });
});

//get single voter

router.get('/voter/:id', (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({
                error: err.message
            });
            return;
        }
        res.json({
            message: 'Voter get id retrieved successfully',
            data: row,
        });
    });
});

//post a voter
router.post('/voter', ({ body }, res) => {
    const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.email];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'Voter post created successfully',
        data: body
      });
    });
    // Data validation
const errors = inputCheck(body, 'first_name', 'last_name', 'email');
if (errors) {
  res.status(400).json({ error: errors });
  return;
}
  });


  //put or place a voter
  router.put('/voter/:id', (req, res) => {
    // Data validation
    const errors = inputCheck(req.body, 'email');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `UPDATE voters SET email = ? WHERE id = ?`;
    const params = [req.body.email, req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'put No voter found with that id',
        });
      } else {
        res.json({
          message: 'Voter put successfully',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

  //Delete a voter
router.delete('/voter/:id', (req, res) => {
    const sql = `DELETE FROM voters WHERE id = ?`;
  
    db.query(sql, req.params.id, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'No voter found with that id',
        });
      } else {
        res.json({
          message: 'Voter deleted successfully',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

module.exports = router;