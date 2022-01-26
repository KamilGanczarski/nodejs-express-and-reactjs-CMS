/**
 * How many days contain a year
 * @param {Date} DateV in structure { y, m, d, h, min, s }
 * @return int days in a year
 */
export const leapYears = (DateV) => {
  let year = DateV.getFullYear();
  if (DateV.getMonth() < 2) {
    year--;
  }
  return year / 4 - year / 100 + year / 400;
}

/**
 * Calc how many days left or have passed
 * @param {String} date Date in string linke RRRR-MM-DD
 * @returns {Sttring} How many days left or have passed
 */
export const	calcPassedTime = (date) => {
  let today = new Date();
  let passed = new Date(date);
  passed = (today - passed) / 1000 / 60 / 60 / 24 + leapYears(today) - leapYears(passed);
  passed = Math.floor(passed);

  // Before date
  if (passed < 0) {
    return `${Math.abs(passed)} days left`;
  // Today
  } else if (passed === 0) {
    return 'Today';
  // After date
  } else if (passed > 0) {
    return `${passed} days have passed`;
  }
}

export const lessThanZero = (number) => {
  return (number < 10) ? "0" + number : number;
}

/**
 * Show custom date in format dd.mm.rrrr
 * @param {String} date Date in string format rrrr-mm-dd 
 * @returns {String} Date in string format dd.mm.rrrr
 */
export const prepareDate_dd_mm_rrrr = (date) => {
  let dateString = "";
  if (date !== '' && date !== null) {
    const dateObj = new Date(date);
    dateString = lessThanZero(dateObj.getDate()) + "." +
      lessThanZero(dateObj.getMonth() + 1) + "." +
      dateObj.getFullYear();
  }
  return dateString;
}

/**
 * Customize date in user
 * @param {String} User User in each row in table
 * @param {String} User.date Date in string format RRRR-MM-DD 
 * @param {String} User.date Date in string format RRRR-MM-DD 
 * @param {String} User.expiryDate Date in string format RRRR-MM-DD 
 * @returns {{
 *    passed: String,
 *    passedEnd: String,
 *    dateShow: String,
 *    expiryDateShow: String
 * }}
 */
export const prepareDateInUser = (User) => {
  let newUser = { ...User };

  // Calc how many days left or have passed
  if (newUser.date.date != null) {
    newUser.date.passed = calcPassedTime(newUser.date.date);
  } else {
    newUser.date.passed = "";
  }

  // Calc how many days left or have passed
  if (newUser.date.expiryDate != null) {
    newUser.date.passedEnd = calcPassedTime(newUser.date.expiryDate);
  } else {
    newUser.date.passedEnd = "";
  }

  // Show custom date in format dd.mm.rrrr
  newUser.date.dateShow = prepareDate_dd_mm_rrrr(newUser.date.date);
  newUser.date.expiryDateShow = prepareDate_dd_mm_rrrr(newUser.date.expiryDate);
  return newUser;
}