const express = require('express');
const router = express.Router();
const User = require('./user');

router.post('/', (req, res) => {
  const { email, passwords } = req.body;

  User.login(email, passwords, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Login failed', error: err });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return user details including role
    return res.json({ message: 'Login successful', user });
  });
});

module.exports = router;
