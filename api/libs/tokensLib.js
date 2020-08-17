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

module.exports = { getLastToken };
