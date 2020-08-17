const express = require('express');
const app = express();

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
    const { error: errorDetailed = {} } = data;
    message = errorDetailed.message || message;
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
