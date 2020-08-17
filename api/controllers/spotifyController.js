const axios = require('axios');

async function postAuth(req, res, next) {}
async function getAlbumsByArtist(req, res, next) {
  const { SPOTIFY_API_URL } = process.env;
  const { artistId } = req.params;
  const bearerToken = `BQCG1tnJ3X1zLai6Hr4n4Ldndvenf6VxQf20r1z5NLB4DRuNsFjrdBaYIrLUMNBwlhhDR1LbaDE35c7ctPs`;
  try {
    const response = await axios({
      method: 'get',
      url: `${SPOTIFY_API_URL}/artists/${artistId}/albums?include_groups=album`,
      headers: {
        authorization: `Bearer ${bearerToken}`
      }
    });
    return res.status(200).send(response);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  postAuth,
  getAlbumsByArtist
};
