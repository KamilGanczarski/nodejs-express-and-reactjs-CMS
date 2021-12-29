module.exports = {
  PORT: process.env.PORT || 3001,
  COOKIE_KEY: process.env.COOKIE_KEY,
  COOKIE_EXPIRY: 24 * 60 * 60 * 1000 // 24 hours
};
