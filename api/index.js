require('dotenv').config();
const express = require('express');
const app = express();
const { PORT: port = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
