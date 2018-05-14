const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const apiRouter = require('./api/api');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(errorhandler());
app.use(morgan('dev')); // log every request to the console
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});

// catch-all for SPA server requests
/*
app.get('/callback', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});
*/

module.exports = app;
