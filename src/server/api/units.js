const express = require('express');
const unitsRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

unitsRouter.param('unitId', (req, res, next, unitId) => {
  console.log('In unitId router param', unitId);
  const sql = 'SELECT * FROM unit WHERE unit.id = $unitId';
  const values = {$unitId: unitId};
  db.get(sql, values, (error, unit) => {
    if (error) {
      next(error);
    } else if (unit) {
      req.unit = unit;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

unitsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM unit WHERE unit.is_current_unit = 1',
    (err, units) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({units: units});
      }
    });
});

unitsRouter.get('/:unitId', (req, res, next) => {
  res.status(200).json({unit: req.unit});
});

unitsRouter.post('/', (req, res, next) => {
  const screen_size = req.body.unit.screen_size,
        orientation = req.body.unit.orientation,
        resolution = req.body.unit.resolution,
        sound = req.body.unit.sound,
        touch = req.body.unit.touch,
        location = req.body.unit.location,
        wifi = req.body.unit.wifi,
        data = req.body.unit.data,
        is_active_unit = req.body.unit.is_active_unit === 0 ? 0 : 1;
  if (!screen_size || !orientation || !resolution || !sound || !touch || !location || !wifi || !data) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO unit (screen_size, orientation, resolution, sound, touch, location, wifi, data, is_ative_unit)' +
      'VALUES ($screen_size, $orientation, $resolution, $sound, $touch, $location, $wifi, $data, $is_active_unit)';
  const values = {
    $screen_size: screen_size,
    $orientation: orientation,
    $resolution: resolution,
    $sound: sound,
    $touch: touch,
    $location: location,
    $wifi: wifi,
    $data: data,
    $is_active_unit: is_active_unit
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM unit WHERE unit.id = ${this.lastID}`,
        (error, unit) => {
          res.status(201).json({unit: unit});
        });
    }
  });
});

unitsRouter.put('/:unitId', (req, res, next) => {
  const screen_size = req.body.unit.screen_size,
        orientation = req.body.unit.orientation,
        resolution = req.body.unit.resolution,
        sound = req.body.unit.sound,
        touch = req.body.unit.touch,
        location = req.body.unit.location,
        wifi = req.body.unit.wifi,
        data = req.body.unit.data,
        is_active_unit = req.body.unit.is_active_unit === 0 ? 0 : 1;
  if (!screen_size || !orientation || !resolution || !sound || !touch || !location || !wifi || !data) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE unit SET screen_size = $screen_size, orientation = $orientation, ' +
      'resolution = $resolution, sound = $sound, touch = $touch, $location = location, ' +
      '$wifi = wifi, $data = data, is_active_unit = $is_active_unit ' +
      'WHERE unit.id = $unitId';
  const values = {
    $screen_size: screen_size,
    $orientation: orientation,
    $resolution: resolution,
    $sound: sound,
    $touch: touch,
    $location: location,
    $wifi: wifi,
    $data: data,
    $is_active_unit: is_active_unit,
    $unitId: req.params.unitId
  };

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM unit WHERE unit.id = ${req.params.unitId}`,
        (error, unit) => {
          res.status(200).json({unit: unit});
        });
    }
  });
});

unitsRouter.delete('/:unitId', (req, res, next) => {
  const sql = 'UPDATE unit SET is_current_unit = 0 WHERE unit.id = $unitId';
  const values = {$unitId: req.params.unitId};

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM unit WHERE unit.id = ${req.params.unitId}`,
        (error, unit) => {
          res.status(200).json({unit: unit});
        });
    }
  });
});

module.exports = unitsRouter;
