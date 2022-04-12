//Import Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

//api routes folder
const apiRoutes = require('./routes/apiRoutes');

//connect to modules and databases 
const db = require('./db/connection');

// Express middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//Added after Express middleware
app.use('/api', apiRoutes);


//404 status
app.use((req, res) => {
    res.status(404).json({
        message: '404 Page Not Found'
    });
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
