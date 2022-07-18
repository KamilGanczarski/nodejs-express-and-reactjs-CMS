const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

// Api
const {
  uploadFileToServer,
  deleteFileFromServer
} = require('./api/file');
const {
  fetchComponentsByIdAndUrl,
  fetchMaxOrderId
} = require('./api/components');
const { fetchPagesByUrl } = require('./api/page');

const uploadFile = async (req, res) => {
  const { page, componentId, fileStatus } = req.query;

  // Check uploaded image and values
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  CustomError.requireProvidedValues(page, componentId, fileStatus);

  const Pages = await fetchPagesByUrl(page);
  if (Pages.length < 1) {
    throw new CustomError.BadRequestError(`No page found like this`);
  }

  const userDir = Pages[0].dir;

  const imageToUpload = req.files.image;
  if (!imageToUpload.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload image');
  }

  await uploadFileToServer(imageToUpload, userDir);

  const components = await fetchComponentsByIdAndUrl(page, componentId);
  if (components.length < 1) {
    throw new CustomError.BadRequestError(`No component found like this`);
  }

  const orderId = await fetchMaxOrderId(
    'file_info', 'page_component_id', componentId
  ) + 1;

  // Insert file to db
  await db.query(
      `INSERT INTO file_info
        (filename, path, order_id, page_component_id, file_status_id)
        VALUES ($1, $2, $3, $4, $5)`,
      [imageToUpload.name, `/uploads/${userDir}/`, orderId, componentId, 1]
    )
    .then((result) => result[0])
    .catch((err) => {
      console.log(err)
      throw new CustomError.BadRequestError("New file hasn't been added");
    });

  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${imageToUpload.name}` } });
}

const deleteFile = async (req, res) => {
  const { page, componentId, fileId, filename } = req.body;

  // Check provided values
  CustomError.requireProvidedValues(page, componentId, fileStatus);

  const Pages = await fetchPagesByUrl(page);
  if (Pages.length < 1) {
    throw new CustomError.BadRequestError(`No page found like this`);
  }

  const files = await db.query(
      'SELECT * FROM file_info WHERE componentId = $1 AND filename = $2',
      [componentId, filename]
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new CustomError.BadRequestError(`No permission with id: ${id}`);
    });

  // Delete file from directory
  // const userDir = Pages[0].dir;
  // await deleteFileFromServer(userDir, filename);
  
  // Delete file from server
  // await db.query('DELETE FROM file_info WHERE fileId = $1', [fileId])
  //   .then((result) => {
  //     res.status(StatusCodes.OK).send({
  //       msg: "You've deleted this file"
  //     });
  //   })
  //   .catch((err) => {
  //     throw new CustomError.BadRequestError("Permission has't been deleted");
  //   });

  res.status(StatusCodes.OK).json({ image: { src: filename } });
}

module.exports = {
  uploadFile,
  deleteFile
}
