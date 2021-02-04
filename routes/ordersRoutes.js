const express = require("express");
const router = express.Router();
const ordersControllers = require("../controllers/ordersControllers");


router.get("/:id", ordersControllers.getById);
router.get("/", ordersControllers.getAll);
router.post("/", ordersControllers.create);

module.exports = router;