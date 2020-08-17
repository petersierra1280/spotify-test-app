const albumsArtistLib = require('../libs/albumsArtistLib');
const authLib = require('../libs/authLib');
const tokensLib = require('../libs/tokensLib');

async function postAuth(req, res, next) {
  try {
    const authInfo = await authLib.getToken();
    return res.status(200).send(authInfo);
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
    return next(error);
  }
}

module.exports = {
  postAuth,
  getAlbumsByArtist
};
