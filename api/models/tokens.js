const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokensSchema = Schema({
  token: String,
  dateAdded: Date
});

const Token = mongoose.model('tokens', TokensSchema);

module.exports = Token;
