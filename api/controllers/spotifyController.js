const albumsArtistLib = require('../libs/albumsArtistLib');
const authLib = require('../libs/authLib');

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
    const bearerToken =
      'BQCG1tnJ3X1zLai6Hr4n4Ldndvenf6VxQf20r1z5NLB4DRuNsFjrdBaYIrLUMNBwlhhDR1LbaDE35c7ctPs';
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
