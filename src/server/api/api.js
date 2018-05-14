const express = require('express');
const apiRouter = express.Router();
const usersRouter = require('./users.js');
const unitsRouter = require('./units.js');

apiRouter.use('/users', usersRouter);
apiRouter.use('/units', unitsRouter);

module.exports = apiRouter;
