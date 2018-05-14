const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS `User` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`username` TEXT NOT NULL, ' +
           '`password` TEXT NOT NULL, ' +
           '`firstname` TEXT NOT NULL, ' +
           '`surname` TEXT NOT NULL, ' +
           '`email` TEXT NOT NULL, ' +
           '`is_current_user` INTEGER NOT NULL DEFAULT 1, ' +
           'PRIMARY KEY(`id`) )');
});

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS `Unit` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`screen_size` INTEGER NOT NULL, ' +
           '`orientation` TEXT NOT NULL, ' +
           '`sound` BOOLEAN NOT NULL, ' +
           '`touch` BOOLEAN NOT NULL, ' +
           '`is_current_unit` INTEGER NOT NULL DEFAULT 1, ' +
           'PRIMARY KEY(`id`) )');
});
