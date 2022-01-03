module.exports = {
  PORT: process.env.PORT || 3001,
  SESSION_KEY: process.env.SESSION_KEY,
  SESSION_EXPIRY: 24 * 60 * 60 * 1000 // 24 hours
};
