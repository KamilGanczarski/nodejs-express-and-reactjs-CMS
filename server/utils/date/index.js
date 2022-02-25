/**
 * Compare date
 * @param {Date} firstDate Date object
 * @param {Date} secondDate Date object
 * @returns true if second date passed first one
 */
const compareDates = (firstDate, secondDate) => {
  return firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)
    ? true
    : false;
}

module.exports = {
  compareDates
}
