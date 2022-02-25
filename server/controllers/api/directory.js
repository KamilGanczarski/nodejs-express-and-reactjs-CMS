const db = require('../../db/connect');

// Update directory
const fetchAndUpdateNewDirectory = async () => {
  // Fetch current value
  const directory = await db.query(
      `SELECT * FROM variables WHERE property = $1`,
      ['directory key']
    )
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.NotFoundError('No directory key found');
    });

  // Convert to number, increment and convert again to hex
  let newDirectory = (parseInt(directory.value, 16) + 1).toString(16);

  // Copy value
  let hexString = newDirectory;

  // Number how many add 0 before number
  const hexLengthToAdd = 8 - hexString.length;

  // Add 0s before number
  for (let i = 0; i < hexLengthToAdd; i++) {
    hexString = "0" + hexString;
  }

  // Update in database
  await db.query(
      `UPDATE variables SET value = $1 WHERE property = $2`,
      [newDirectory, 'directory key']
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.NotFoundError('No directory key found');
    });

  return hexString;
}

module.exports = {
  fetchAndUpdateNewDirectory
}
