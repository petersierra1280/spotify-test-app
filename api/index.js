require('dotenv').config();

const { PORT: port = 3000 } = process.env;
const app = require('./app');

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
