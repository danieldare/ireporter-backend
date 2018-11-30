const express = require('express');
const bodyParser = require('body-parser');

// Importing route files
const users = require('./routes/api/users');
const redflag = require('./routes/api/redflag');

// Init Express App.
const app = express();

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use routes
app.use('/api/v1/users', users);
app.use('/api/v1/red-flags', redflag);

// Init Server
const port = 5010 || process.env.port;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
