const express = require('express');
const router = express.Router();
const User = require('./user');

router.post('/', (req, res) => {
  const userData = req.body;

  User.register(userData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Registration failed', error: err });
    }
    return res.json({ message: 'Registration successful', result });
  });
});

module.exports = router;
