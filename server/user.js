const bcrypt = require('bcryptjs');
const db = require('./db');

const User = {
  register: (userData, callback) => {
    const saltRounds = 10;

    bcrypt.hash(userData.passwords, saltRounds, (err, hashedPassword) => {
      if (err) {
        return callback(err, null);
      }

      db.query(
        'INSERT INTO users (name, last_name, passwords, email, role) VALUES (?, ?, ?, ?, ?)',
        [userData.name, userData.last_name, hashedPassword, userData.email, '0'],
        (dbErr, result) => {
          if (dbErr) {
            return callback(dbErr, null);
          }
          return callback(null, result);
        }
      );
    });
  },

  login: (email, passwords, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      const user = results[0];

      bcrypt.compare(passwords, user.passwords, (compareErr, isMatch) => {
        if (compareErr) {
          return callback(compareErr, null);
        }

        if (!isMatch) {
          return callback(null, null);
        }

        return callback(null, user);
      });
    });
  },
};

module.exports = User;
