const albumsArtistLib = require('../libs/albumsArtistLib');
const authLib = require('../libs/authLib');
const tokensLib = require('../libs/tokensLib');

async function postAuth(req, res, next) {
  try {
    const token = await authLib.getToken();
    return res.status(200).send({ token });
  } catch (error) {
    return next(error);
  }
}
async function getAlbumsByArtist(req, res, next) {
  const { artistId } = req.params;
  try {
    const bearerToken = await tokensLib.getLastToken();
    const data = await albumsArtistLib.albumsByArtist(artistId, bearerToken);
    return res.status(200).send(data);
  } catch (error) {
    const { response = {} } = error;
    const { status } = response;
    if (status && status === 401) {
      try {
        const newToken = await authLib.getToken();
        const data = await albumsArtistLib.albumsByArtist(artistId, newToken);
        return res.status(200).send(data);
      } catch (newError) {
        return next(NewError);
      }
    } else {
      return next(error);
    }
  }
}

module.exports = {
  postAuth,
  getAlbumsByArtist
};
