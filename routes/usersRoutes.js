const express = require("express");
const UserRouter = express.Router();
const usersControllers = require("../controllers/usersControllers");


UserRouter.get("/:id", usersControllers.getById);
UserRouter.get("/", usersControllers.getAll);
UserRouter.post("/", usersControllers.create);

module.exports = UserRouter;
