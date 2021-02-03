const dotenv = require("dotenv");
// init of dotenv
dotenv.config();
const express = require("express");
//import routes
const usersRoutes = require("./routes/usersRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

const { PORT } = process.env || 3000;

const app = express();
const port = PORT;

app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
