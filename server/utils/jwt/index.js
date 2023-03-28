const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createToken
} = require('./jwt');
const createTokenUser = require('./createTokenUser');
const { generateHash, validPassword } = require('./password');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createToken,
  createTokenUser,
  generateHash,
  validPassword
}
