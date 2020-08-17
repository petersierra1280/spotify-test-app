const axios = require('axios');
const qs = require('qs');
const Token = require('../models/tokens');

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
  const { data } = response;
  const { access_token: token } = data;
  const accessToken = new Token({
    token,
    dateAdded: new Date()
  });
  accessToken.save();
  return data;
};

module.exports = { getToken };
