const dotenv = require("dotenv");
// init of dotenv
dotenv.config();
const express = require("express");
// import bodyparser
const bodyParser = require("body-parser");
//import routes
const usersRoutes = require("./routes/usersRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const tokenRoutes = require("./routes/tokenRoutes");

const { PORT } = process.env || 3000;

const app = express();
const port = PORT;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//to load the files that are in the public directory (img, css, html, js)
app.use(express.static("public"));
app.use("/images", express.static("uploads"));

app.use("/users", tokenRoutes, usersRoutes);
app.use("/orders", tokenRoutes, ordersRoutes);
app.use("/", uploadRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
