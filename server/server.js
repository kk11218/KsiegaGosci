const express = require('express');
const app = express();
const db = require('./db');
const port = 3001;




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
