const express = require('express');
const router = require('./routes/index');
const connectDB = require('./config/dbConnection');

//variables
const PORT = process.env.PORT || 5001;
const app = express();

//connect to DB
connectDB();
//routes
app.use('/', router);
app.use('*', (req, res) => {
  return res.json({
    status: 200,
    message: 'API Connected',
  });
});

//setup the server
app.listen(PORT, () => console.log(`API Server is running on Port ${PORT}`));