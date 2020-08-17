const express = require('express');
const app = express();

// MongoDB connection
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const {
  MONGO_HOST = 'localhost',
  MONGO_DATABASE,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_REPLICA_SET = '',
  MONGO_AUTH_DATABASE = 'admin'
} = process.env;

const configureMongoDb = require('./configureMongoDb');

configureMongoDb({
  host: MONGO_HOST,
  database: MONGO_DATABASE,
  user: MONGO_USER,
  password: MONGO_PASSWORD,
  replicaSet: MONGO_REPLICA_SET,
  authDatabase: MONGO_AUTH_DATABASE,
  mongoose
});

// Controllers
const spotifyController = require('./controllers/spotifyController');

// Routes
app.get('/', (req, res) => {
  const data = { message: 'API running successfully!' };
  res.send(data);
});
app.post('/spotify/auth', spotifyController.postAuth);
app.get('/spotify/get-albums/:artistId', spotifyController.getAlbumsByArtist);

app.use((error, req, res, next) => {
  let { message, name, response } = error;
  let status = 500;
  if (!response) {
    console.error(error);
  } else {
    status = response.status;
    const { data = {} } = response;
    const {
      error: errorDetailed = {},
      error_description: errorDescription = ''
    } = data;
    message = errorDescription || errorDetailed.message || message;
  }
  return res.status(status).send({
    code: 'SERVER_RESPONDED_WITH_FAILED_CODE',
    error: {
      message,
      name
    }
  });
});

module.exports = app;
