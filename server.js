//import express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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

 