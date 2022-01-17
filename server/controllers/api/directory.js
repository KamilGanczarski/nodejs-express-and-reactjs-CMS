const Variables = require('../../models/Variables')

// Update directory
const fetchAndUpdateNewDirectory = async () => {
  // Fetch current value
  const directory = await Variables.findOne({ property: 'directory key' });

  // Convert to number, increment and convert again to hex
  let newDirectory = (parseInt(directory.value, 16) + 1).toString(16);

  // Copy value
  let hexString = newDirectory;

  // Number how many add 0 before number
  const hexLengthToAdd = 8 - hexString.length;

  // Add 0s
  for (let i = 0; i < hexLengthToAdd; i++) {
    hexString = "0" + hexString;
  }

  // Update in database
  await Variables.findByIdAndUpdate(directory._id, { value: newDirectory });
  return hexString;
}

module.exports = {
  fetchAndUpdateNewDirectory
}