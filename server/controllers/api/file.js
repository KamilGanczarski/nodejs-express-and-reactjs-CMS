const CustomError = require('../../errors');
const path = require('path');
const fs = require('fs');

const uploadsDir = `../../../client/public/uploads`;
const maxSize = 10 * 1024 * 1024;

const createUserDirectory = (userDir) => {
  const dirPath = path.join(__dirname, `${uploadsDir}/${userDir}`);
  if (!fs.existsSync(dirPath)) {
    fs.mkdir(path.join(__dirname, `${uploadsDir}/${userDir}`), (err) => {
      if (err) {
        throw new CustomError.BadRequestError("Directory hasn't been created");
      }
    });
  }
}

const checkIffileAleadyExists = (file) => {
  if(fs.existsSync(file)) {
    throw new CustomError.BadRequestError("File already exists");
  }
}

const uploadFileToServer = async (imageToUpload, userDir) => {
  if (imageToUpload.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller 10MB');
  }

  createUserDirectory(userDir);
  createUserDirectory(`${userDir}/sizesm`);
  createUserDirectory(`${userDir}/sizemd`);
  createUserDirectory(`${userDir}/sizeog`);

  const imagePaths = [
    path.join(__dirname, `${uploadsDir}/${userDir}/sizesm/${imageToUpload.name}`),
    path.join(__dirname, `${uploadsDir}/${userDir}/sizemd/${imageToUpload.name}`),
    path.join(__dirname, `${uploadsDir}/${userDir}/sizeog/${imageToUpload.name}`)
  ];

  checkIffileAleadyExists(imagePaths[0]);
  checkIffileAleadyExists(imagePaths[1]);
  checkIffileAleadyExists(imagePaths[2]);

  // Upload file
  try {
    await imageToUpload.mv(imagePaths[0]);
    await imageToUpload.mv(imagePaths[1]);
    await imageToUpload.mv(imagePaths[2]);
  } catch(err) {
    throw new CustomError.BadRequestError(
      `File hasn't been uploaded: ${imageToUpload.name}`
    );
  }
}

const deleteFileFromServer = async (userDir, filename) => {
  // Get file full path
  const imagePath = path.join(__dirname, `${uploadsDir}/${userDir}/sizemd/${filename}`);

  if (!fs.existsSync(imagePath)) {
    throw new CustomError.BadRequestError("Directory doesn't exist");
  }

  // Remove file
  try {
    fs.unlinkSync(imagePath);
  } catch(err) {
    throw new CustomError.BadRequestError(
      `No file with this filename: ${filename}`
    );
  }
}

module.exports = {
  uploadFileToServer,
  deleteFileFromServer
}
