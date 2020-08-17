const axios = require('axios');

const albumsByArtist = async (artistId, bearerToken) => {
  const { SPOTIFY_API_URL } = process.env;
  const response = await axios({
    method: 'get',
    url: `${SPOTIFY_API_URL}/artists/${artistId}/albums?include_groups=album`,
    headers: {
      authorization: `Bearer ${bearerToken}`
    }
  });
  return response.data;
};

module.exports = { albumsByArtist };
