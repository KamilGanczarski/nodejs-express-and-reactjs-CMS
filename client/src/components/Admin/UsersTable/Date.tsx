// Utils
import { ShowDateModel } from '../../../interfaces/interfaces';

/**
 * How many days contain a year
 * @param {Date} DateV in structure { y, m, d, h, min, s }
 * @return int days in a year
 */
 export const leapYears = (DateV: Date): number => {
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
export const calcPassedTime = (date: string): string => {
  const today = new Date();
  let eventDate = new Date(date);

  let passed = (today.getTime() - eventDate.getTime()) / 1000 / 60 / 60 / 24
    + leapYears(today) - leapYears(eventDate);
  passed = Math.floor(passed);

  // Before date
  if (passed < 0) {
    return `${Math.abs(passed)} days left`;
  // Today
  } else if (passed === 0) {
    return 'Today';
  // After date
  }
  return `${passed} days have passed`;
}

export const lessThanZero = (number: number): string => {
  return (number < 10) ? `0${number}` : number.toString();
}

/**
 * Show custom date in format dd.mm.rrrr
 * @param {String} date Date in string format rrrr-mm-dd 
 * @returns {String} Date in string format dd.mm.rrrr
 */
export const prepareDate_dd_mm_rrrr = (date: Date):  string => {
  let dateString = "";
  if (date) {
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
export const prepareDateInUser = (User: any): ShowDateModel => {
  let ShowDate: ShowDateModel = {
    date: '',
    passed: '',
    expiryDate: '',
    passedEnd: ''
  };

  let newUser = { ...User };

  // Calc how many days left or have passed
  if (newUser.date != null) {
    ShowDate.passed = calcPassedTime(newUser.date);
  } else {
    ShowDate.passed = "";
  }

  // Calc how many days left or have passed
  if (newUser.expirydate != null) {
    ShowDate.passedEnd = calcPassedTime(newUser.expirydate);
  } else {
    ShowDate.passedEnd = "";
  }

  // Show custom date in format dd.mm.rrrr
  ShowDate.date = prepareDate_dd_mm_rrrr(newUser.date);
  ShowDate.expiryDate = prepareDate_dd_mm_rrrr(newUser.expirydate);
  return ShowDate;
}
