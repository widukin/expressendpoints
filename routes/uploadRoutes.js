const express = require("express");
const path = require("path");
const UploadRouter = express.Router();
const uploadControllers = require("../controllers/uploadControllers");
// import Multer (a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.)
const multer = require("multer");

// define upload destination storage directory
/* var upload = multer({ dest: "public/uploads/" }); */
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (_, file, cb) => {
    cb(
      null,
      //`${file.fieldname} - ${Date.now()}.$f{ile.mimetype.split("/")[1]}`
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

UploadRouter.get("/", uploadControllers.getIndex);

UploadRouter.post(
  "/upload-profile-pic",
  //profile_pic is the name of the input type file
  upload.single("profile_pic"),
  uploadControllers.getProfilPic
);

module.exports = UploadRouter;
