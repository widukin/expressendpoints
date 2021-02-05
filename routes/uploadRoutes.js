const express = require("express");
const UploadRouter = express.Router();
const uploadControllers = require("../controllers/uploadControllers");

UploadRouter.post("/upload-profile-pic", uploadControllers.getProfilPic);

module.exports = UploadRouter;
