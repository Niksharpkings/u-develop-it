//import express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
//import mysql2 
const mysql = require('mysql2');

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

 