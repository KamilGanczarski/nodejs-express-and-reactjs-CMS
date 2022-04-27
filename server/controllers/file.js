const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const path = require('path');
const fs = require('fs');
const uploadsDir = `../../client/public/uploads`;

const uploadFile = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }

  const userDir = '00000000';

  const imageToUpload = req.files.files[0];

  if (!imageToUpload .mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 10 * 1024 * 1024;
  if (imageToUpload.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller 10MB');
  }

  const dirPath = path.join(__dirname, `${uploadsDir}/${userDir}`);
  if (!fs.existsSync(dirPath)) {
    fs.mkdir(path.join(__dirname, `${uploadsDir}/${userDir}`), (err) => {
      if (err) {
        throw new CustomError.BadRequestError("Directory hasn't been created");
      }
    });
  }

  const imagePath = path.join(
    __dirname,
    `${uploadsDir}/${userDir}/${imageToUpload.name}`
  );

  await imageToUpload.mv(imagePath);

  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${imageToUpload.name}` } });
}

const removeFile = async (req, res) => {
  const { filename } = req.body;

  const userDir = '00000000';

  const dirPath = path.join(__dirname, `${uploadsDir}/${userDir}`);
  if (!fs.existsSync(dirPath)) {
    throw new CustomError.BadRequestError("Directory doesn't exist");
  }

  // Get file full path
  const imagePath = path.join(__dirname, `${uploadsDir}/${userDir}/${filename}`);

  // Remove file
  try {
    fs.unlinkSync(imagePath);
  } catch(err) {
    throw new CustomError.BadRequestError(
      `No file with this filename: ${filename}`
    );
  }

  res.status(StatusCodes.OK).json({ image: { src: filename } });
}

module.exports = {
  uploadFile,
  removeFile
}
