const axios = require('axios');
const qs = require('qs');

const getToken = async () => {
  const { SPOTIFY_ACCOUNTS_URL, APP_TOKEN } = process.env;
  const response = await axios({
    method: 'post',
    url: `${SPOTIFY_ACCOUNTS_URL}/token`,
    headers: {
      authorization: `Basic ${APP_TOKEN}`,
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    data: qs.stringify({
      grant_type: 'client_credentials'
    })
  });
  return response.data;
};

module.exports = { getToken };
