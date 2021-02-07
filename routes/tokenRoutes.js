const express = require("express");
const tokenRouter = express.Router();
const tokenControllers = require("../controllers/tokenControllers");

tokenRouter.get("/", tokenControllers.verify);

module.exports = tokenRouter;
