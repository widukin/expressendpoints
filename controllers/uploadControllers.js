// import Multer (a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.)
const multer = require("multer");

module.exports = {
  getProfilPic: async (req, res, next) => {
    try {
      console.log(req.file);
      res.send(`file ${req.file.filename} uploaded`);
    } catch (e) {
      console.error(Error(e));
      res.sendStatus(500).send("ERROR occurred - no Upload");
    }
  },
  // do I need that, works also without
  getIndex: async (req, res) => {
    res.sendFile("public/index.html");
  },
};
