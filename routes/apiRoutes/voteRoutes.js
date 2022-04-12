const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/votes', (req, res) => {
    const sql = `SELECT * FROM votes ORDER BY id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({
                message: 'Error connecting to DB'
            });
            return;
        }
        res.json({
            message: 'Votes get retrieved successfully',
            data: rows,
        });
    });
});

//get single voter

router.get('/votes/:id', (req, res) => {
    const sql = `SELECT * FROM votes WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({
                error: err.message
            });
            return;
        }
        res.json({
            message: 'Vote get id retrieved successfully',
            data: row,
        });
    });
});

router.post('/vote', ({ body }, res) => {
    //Data validation
    const errors = inputCheck(body, 'candidate_id', 'voter_id');
    if (errors) {
        res.status(400).json({
            error: errors
        });
        return;
    }

    const sql = `INSERT INTO votes (voter_id, candidate_id) VALUES (?,?)`;
    const params = [body.voter_id, body.candidate_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({
                error: err.message
            });
            return;
        }
        res.json({
            message: 'Vote created successfully',
            data: body,
            changes: result.affectedRows
        });
    });
});


module.exports = router;