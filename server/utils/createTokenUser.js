const createTokenUser = (user) => {
  return {
    userId: user._id,
    login: user.login,
    permission: user.permission,
    role: user.role.value,
    expiryDateOfPassword: user.expiryDateOfPassword
  }
}

module.exports = createTokenUser;
