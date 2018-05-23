const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

// Seed User table
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='User'", (error, table) => {
  if (error) {
    throw new Error(error);
  }

  if (table) {
    db.serialize(function() {
      let userId;
      db.run("INSERT INTO user (username, password, firstname, surname, email, cell) " +
        "VALUES ('user1', 'pass1', 'Darryll', 'Robinson', 'd@fcm.co.za', '082')");
        db.run("INSERT INTO user (username, password, firstname, surname, email, cell) " +
          "VALUES ('user2', 'pass2', 'Brendan', 'Ballantine', 'b@fcm.co.za', '073')"), function(error) {
            if (error) {
              throw new Error(error);
            }
            userId = this.lastID;
          };

    });
  }
});

// Seed Content table
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Content'", (error, table) => {
  if (error) {
    throw new Error(error);
  }

  if (table) {
    db.serialize(function() {
      let contentId;
      db.run("INSERT INTO content (name, filename) " +
        "VALUES ('Star', 'C:\Users\drobinson\Documents\projects\cms-main\src\components\videos\Star - 6962.mp4')");
        db.run("INSERT INTO content (name, filename) " +
          "VALUES ('Snowy', 'C:\Users\drobinson\Documents\projects\cms-main\src\components\videos\Snowy Trees - 7328')"), function(error) {
            if (error) {
              throw new Error(error);
            }
            contentId = this.contentId;
          };

    });
  }
});

// Seed Unit table
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Unit'", (error, table) => {
  if (error) {
    throw new Error(error);
  }

  if (table) {
    db.serialize(function() {
      let unitId;
      db.run("INSERT INTO unit (screen_size, orientation, resolution, sound, touch, location, wifi, data) " +
        "VALUES (49, 'landscape', '680x480', 'false', 'false', 'Maponya', 'false', 'true')");
        db.run("INSERT INTO unit (screen_size, orientation, resolution, sound, touch, location, wifi, data) " +
          "VALUES (49, 'landscape', '680x480', 'false', 'false', 'Southgate', 'true', 'false')"), function(error) {
            if (error) {
              throw new Error(error);
            }
            unitId = this.lastID;
          };

    });
  }
});
