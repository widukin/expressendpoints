const dotenv = require("dotenv");
// init of dotenv
dotenv.config();
const express = require("express");
// import bodyparser
const bodyParser = require("body-parser");
// import Multer (a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.)
const multer = require("multer");
//import routes
const usersRoutes = require("./routes/usersRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const { PORT } = process.env || 3000;

const app = express();
const port = PORT;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);
app.use("/", uploadRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
