const express = require("express");
const tokenRouter = express.Router();
const tokenControllers = require("../controllers/tokenControllers");

router.get("/", tokenControllers.verify);

module.exports = router;
