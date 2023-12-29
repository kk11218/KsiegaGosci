// server/user.js
const db = require('./db');

const User = {
  register: (userData, callback) => {
    db.query(
      'INSERT INTO users (name, last_name, passwords, email, role) VALUES (?, ?, ?, ?, ?)',
      [userData.name, userData.last_name, userData.passwords, userData.email, '0'],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, result);
      }
    );
  },
};

module.exports = User;
