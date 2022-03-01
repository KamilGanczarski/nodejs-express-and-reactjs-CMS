const createTokenUser = (user) => {
  return {
    userId: user.id,
    login: user.login,
    permission: user.permission,
    role: user.roles[0].value,
    passwordExpiryDate: user.passwordexpirydate
  }
}

module.exports = createTokenUser;
