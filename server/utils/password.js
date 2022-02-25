const bcrypt = require('bcryptjs');

const generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const validPassword = (reqPassoword, password) => {
  return bcrypt.compareSync(reqPassoword, password);
}

module.exports = {
  generateHash,
  validPassword
}
