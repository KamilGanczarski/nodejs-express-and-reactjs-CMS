const createTokenUser = (user) => {
  return {
    userId: user._id,
    login: user.login,
    permission: user.permission.value
  }
}

module.exports = createTokenUser;
