const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");


router.get("/:id", usersControllers.getById);
router.get("/", usersControllers.getAll);
/* router.post("/user", usersControllers.create); */

module.exports = router;
