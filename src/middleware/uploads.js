const multer = require("multer");
//Single file Upload

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, callback) => {
//   if (
//     file.mimetype == "image/png" ||
//     file.mimetype == "image/jpg" ||
//     file.mimetype == "image/jpeg" ||
//     file.mimetype == "application/pdf"
//   ) {
//     callback(null, true);
//   } else {
//     console.log("uplaod png and jpg file only");
//     callback(null, false);
//   }
// };
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
//   fileFilter: fileFilter,
// }).single("profileimg");

//Multiple file of Different extension Upload//

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "resume") {
      cb(null, "./resume/");
    } else {
      cb(null, "./uploads/");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.fieldname == "resume") {
    if (file.mimetype == "application/pdf") {
      callback(null, true);
    } else {
      console.log("uplaod pdf file only");
      callback(null, false);
    }
  } else {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("uplaod png and jpg file only");
      callback(null, false);
    }
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: fileFilter,
}).fields([
  { name: "profileimg", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);
module.exports = upload;
