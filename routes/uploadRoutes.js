const express = require("express");
const UploadRouter = express.Router();
const uploadControllers = require("../controllers/uploadControllers");

UploadRouter.get("/upload-profile-pic", uploadControllers.getProfilPic);

module.exports = UploadRouter;
