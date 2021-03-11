const multer = require("multer");
const path = require("path");
const { book } = require("./../../db/models");

const diskStorage = multer.diskStorage({
  destination: path.join("./public/upload"),
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, `cover-${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`)
  },
});

// let maxSize = 100000

const uploadCover = multer({
    // update colom url cover
    storage: diskStorage,
    fileFilter: function(req, file,cb) {
        if (path.extname(file.originalname) !==  '.jpg' && path.extname(file.originalname) !==  '.png') {
            return cb(new Error('Hanya jpg png'))
        }
        cb(null, true)
    },
    // limits:{fileSize: maxSize}
  });



module.exports = { uploadCover };
