const Token = require('../models/tokens');

const getLastToken = async () => {
  const lastToken = await Token.find({}).sort({ dateAdded: -1 }).limit(1);

  if (!lastToken) {
    return null;
  } else {
    const { token } = lastToken[0];
    return token;
  }
};

const extractTokenFromResponse = response => {
  if (response) {
    const { data } = response;
    const { access_token: token } = data;
    return token;
  } else {
    return null;
  }
};

module.exports = { getLastToken, extractTokenFromResponse, Token };
