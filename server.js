//Import Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

//api routes folder
const apiRoutes = require('./routes/apiRoutes');

//connect to modules and databases 
const db = require('./db/connection');

//mysql input checker
const inputCheck = require('./utils/inputCheck');

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

//Start server after DB connection
//express server port listener
db.connect((err) => {
  if (err) {
      console.error('Error connecting to DB');
      return;
  }
  app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
  });
});
