const express = require('express');
const usersRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');
/*
usersRouter.param('userId', (req, res, next, userId) => {
  console.log('In userId router param', userId);
  const sql = 'SELECT * FROM user WHERE user.id = $userId';
  const values = {$userId: userId};
  db.get(sql, values, (error, user) => {
    if (error) {
      next(error);
    } else if (user) {
      req.user = user;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});
*/
usersRouter.param('username', (req, res, next, username) => {
  console.log('In username router param');
  const sql = 'SELECT * FROM user WHERE user.username = $username';
  const values = {$username: username};
  db.get(sql, values, (error, user) => {
    if (error) {
      next(error);
    } else if (user) {
      req.user = user;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

usersRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM user WHERE user.is_current_user = 1',
    (err, users) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({users: users});
      }
    });
});
/*
usersRouter.get('/:userId', (req, res, next) => {
  res.status(200).json({user: req.user});
});
*/
usersRouter.get('/:username', (req, res, next) => {
  res.status(200).json({user: req.user});
});

usersRouter.post('/', (req, res, next) => {
  const username = req.body.user.username,
        password = req.body.user.password,
        firstname = req.body.user.firstname,
        surname = req.body.user.surname,
        email = req.body.user.email,
        cell = req.body.user.cell,
        is_current_user = req.body.user.is_current_user === 0 ? 0 : 1;
  if (!username || !password || !firstname || !surname ||!email ||!cell) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO user (username, password, firstname, surname, email, cell, is_current_user)' +
      'VALUES ($username, $password, $firstname, $surname, $email, $cell $is_current_user)';
  const values = {
    $username: username,
    $password: password,
    $firstname: firstname,
    $surname: surname,
    $email: email,
    $cell: cell,
    $is_current_user: is_current_user
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM user WHERE user.id = ${this.lastID}`,
        (error, user) => {
          res.status(201).json({user: user});
        });
    }
  });
});

usersRouter.put('/:userId', (req, res, next) => {
  const username = req.body.user.username,
        password = req.body.user.password,
        firstname = req.body.user.firstname,
        surname = req.body.user.surname,
        email = req.body.user.email,
        cell = req.body.user.cell,
        is_current_user = req.body.user.is_current_user === 0 ? 0 : 1;
  if (!username || !password || !firstname || !surname ||!email ||!cell) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE user SET username = $username, password = $password, firstname = $firstname, ' +
      'surname = $surname, email = $email, cell = $cell, is_current_user = $is_current_user ' +
      'WHERE user.id = $userId';
  const values = {
    $username: username,
    $password: password,
    $firstname: firstname,
    $surname: surname,
    $email: email,
    $cell: cell,
    $is_current_user: is_current_user,
    $userId: req.params.userId
  };

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM user WHERE user.id = ${req.params.userId}`,
        (error, user) => {
          res.status(200).json({user: user});
        });
    }
  });
});

usersRouter.delete('/:userId', (req, res, next) => {
  const sql = 'UPDATE user SET is_current_user = 0 WHERE user.id = $userId';
  const values = {$userId: req.params.userId};

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM user WHERE user.id = ${req.params.userId}`,
        (error, user) => {
          res.status(200).json({user: user});
        });
    }
  });
});

module.exports = usersRouter;
