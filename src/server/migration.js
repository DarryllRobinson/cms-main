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
           '`cell` TEXT NOT NULL, ' +
           '`is_current_user` INTEGER NOT NULL DEFAULT 1, ' +
           'PRIMARY KEY(`id`) )');
});

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS `Content` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`name` TEXT NOT NULL, ' +
           '`filename` TEXT NOT NULL, ' +
           'PRIMARY KEY(`id`) )');
});

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS `Unit` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`screen_size` INTEGER NOT NULL, ' +
           '`orientation` TEXT NOT NULL, ' +
           '`resolution` TEXT NOT NULL, ' +
           '`sound` BOOLEAN NOT NULL, ' +
           '`touch` BOOLEAN NOT NULL, ' +
           '`location` TEXT NOT NULL, ' +
           '`wifi` BOOLEAN NOT NULL, ' +
           '`data` BOOLEAN NOT NULL, ' +
           '`is_active_unit` INTEGER NOT NULL DEFAULT 1, ' +
           'PRIMARY KEY(`id`) )');
});

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS `Company` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`name` TEXT NOT NULL, ' +
           '`address1` TEXT NOT NULL, ' +
           '`address2` TEXT NOT NULL, ' +
           '`address3` TEXT, ' +
           '`address4` TEXT, ' +
           '`industry` TEXT NOT NULL, ' + // draw from industry table??
           '`contact-first` TEXT NOT NULL, ' +
           '`contact-surname` TEXT NOT NULL, ' +
           '`contact-email` TEXT NOT NULL, ' +
           '`contact-cell` TEXT NOT NULL, ' +
           '`is_active_company` INTEGER NOT NULL DEFAULT 1, ' +
           'PRIMARY KEY(`id`) )');
});
