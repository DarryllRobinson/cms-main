const express = require('express');
const contentsRouter = express.Router();
const fileUpload = require('express-fileupload');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');
const cors = require('cors');

contentsRouter.use(fileUpload());
contentsRouter.use(cors());
contentsRouter.options('*', cors());

/*
const whitelist = ['http://localhost:3000'];
const corsOptionsDelegate = function (req, callback) {
  const corsOptions = {};
  if (whitelist.indexOf(req.header('Origin')) !== 1) {
    //console.log('allowed');
    corsOptions = { origin: true }; //enable the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions) //callback expects two parameters: error and options
};
*/

contentsRouter.param('contentID', (req, res, next, contentID) => {
  console.log('In contentID router param', contentID);
  const sql = 'SELECT * FROM content WHERE content.id = $contentID';
  const values = {$contentID: contentID};
  db.get(sql, values, (error, content) => {
    if (error) {
      next(error);
    } else if (content) {
      req.content = content;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

contentsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM content',
    (err, contents) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({contents: contents});
      }
    });
});

contentsRouter.get('/:contentId', (req, res, next) => {
  console.log('req: ', JSON.stringify(req.body.name));
  res.status(200).json({content: req.content});
});

contentsRouter.post('/upload', cors(), (req, res, next) => {
  console.log('req.body: ', req.body);
  const name = req.body.name,
        filename = req.body.filename;
  if (!name || !filename) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO content (name, filename)' +
      'VALUES ($name, $filename)';
  const values = {
    $name: name,
    $filename: filename
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM content WHERE content.id = ${this.lastID}`,
        (error, content) => {
          res.status(201).json({content: content});
        });
    }
  });
});


module.exports = contentsRouter;
