const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello Karol!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
