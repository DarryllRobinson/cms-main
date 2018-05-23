const express = require('express');
const apiRouter = express.Router();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require('./users.js');
const unitsRouter = require('./units.js');
const contentsRouter = require('./contents.js');

apiRouter.use(favicon(path.join(__dirname, '../../../public', 'favicon.ico')));
apiRouter.use(logger('dev'));
apiRouter.use(cors());

apiRouter.use(bodyParser.urlencoded( {
  limit: '50mb',
  paramerLimit: 100000,
  extended: false
}));
apiRouter.use(bodyParser.json({
  limit: '5mb'
}));

/*apiRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

apiRouter.use(cookieParser());
apiRouter.use('/public', express.static(__dirname + '/public'));

apiRouter.use('/users', usersRouter);
apiRouter.use('/units', unitsRouter);
apiRouter.use('/contents', contentsRouter);

module.exports = apiRouter;
