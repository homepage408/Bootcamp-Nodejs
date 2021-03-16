const multer = require("multer");
const path = require("path");

// Dengan function
// function upload(path) {
//   const diskStorage = multer.diskStorage({
//     destination: path.join("./public/upload"),
//     filename: (req, file, cb) => {
//       // console.log(file);
//       cb(
//         null,
//         `cover-${file.fieldname}-${Date.now()}-${path.extname(
//           file.originalname
//         )}`
//       );
//     },
//   });
//   return diskStorage;
// }

// const mulllter = multer({
//   fileFilter: function (req, file, cb) {
//     if (
//       path.extname(file.originalname) !== ".jpg" &&
//       path.extname(file.originalname) !== ".png"
//     ) {
//       return cb(new Error("Hanya jpg png"));
//     }
//     cb(null, true);
//   },
// });
// tanpa function

const diskStorageUser = multer.diskStorage({
  destination: path.join("./public/upload/photoUser"),
  filename: (req, file, cb) => {
    // console.log(file);
    cb(
      null,
      `cover-${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`
    );
  },
});

// let maxSize = 100000

const uploadPhotoUser = multer({
  // update colom url cover
  storage: diskStorageUser,
  fileFilter: function (req, file, cb) {
    if (
      path.extname(file.originalname) !== ".jpg" &&
      path.extname(file.originalname) !== ".png"
    ) {
      return cb(new Error("Hanya jpg png"));
    }
    cb(null, true);
  },
  // limits:{fileSize: maxSize}
});

const diskStorageVehicle = multer.diskStorage({
  destination: path.join("./public/upload/photoVehicle"),
  filename: (req, file, cb) => {
    // console.log(file);
    cb(
      null,
      `cover-${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`
    );
  },
});

// let maxSize = 100000

const uploadVehicle = multer({
  // update colom url cover
  storage: diskStorageVehicle,
  fileFilter: function (req, file, cb) {
    if (
      path.extname(file.originalname) !== ".jpg" &&
      path.extname(file.originalname) !== ".png"
    ) {
      return cb(new Error("Hanya jpg png"));
    }
    cb(null, true);
  },
  // limits:{fileSize: maxSize}
});

module.exports = { uploadPhotoUser, uploadVehicle };
