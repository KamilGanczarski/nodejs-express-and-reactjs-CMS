const BadRequestError = require('./bad-request');

/**
 * If undefined or null value throw error
 * @param  {...any} args Arguments to check
 */
const requireProvidedValues = (...args) => {
  for (let i = 0; i < args.length; i++) {
    if (!args[i]) {
      throw new BadRequestError('Please provide all values');
    }
  }
}

module.exports = {
  requireProvidedValues
}
