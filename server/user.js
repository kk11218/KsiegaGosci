const bcrypt = require('bcryptjs');
const db = require('./db');

const User = {
  register: (userData, callback) => {
    // Szyfrowanie hasła przed zapisaniem do bazy danych
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

  // Dodaj inne funkcje związane z użytkownikami, np. funkcję do logowania
  login: (email, passwords, callback) => {
    // Implementacja funkcji logowania
  },
};

module.exports = User;
