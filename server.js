const express = require("express");
const dotenv = require("dotenv");
// init of dotenv
dotenv.config();
//import DB connection
const dbConnection = require("./dbconfig");

const { PORT } = process.env;

const app = express();
const port = PORT;

/* get all orders */
app.get("/orders/", async (req, res) => {
  try {
    const orders = await dbConnection.query("SELECT * FROM orders");
    res.json({
      code: 200,
      operation: "success",
      description: "Fetched all orders",
      data: orders.rows,
    });
  } catch (e) {
    console.error(Error(e));
    res.status(500).send("ERROR occurred - no Orders for you today");
  }
});

/* get all orders */
app.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await dbConnection.query("SELECT * FROM orders WHERE id=$1", [id]);
    res.json({
      code: 200,
      operation: "success",
      description: "Fetched all orders",
      data: order.rows,
    });
  } catch (e) {
    console.error(Error(e));
    res.status(500).send("ERROR occurred - no Orders for you today");
  }
});

/* get all users */
app.get("/users/", async (req, res) => {
  try {
    const users = await dbConnection.query("SELECT * FROM users");
    res.json({
      code: 200,
      operation: "success",
      description: "Fetched all users",
      data: users.rows,
    });
  } catch (error) {
    console.error(Error(error));
    res.status(500).send("ERROR occurred - no Users for you today");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
