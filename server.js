const express = require("express");
const dotenv = require("dotenv");
// init of dotenv
dotenv.config();
//import DB connection
const dbConnection = require("./dbconfig");

const { PORT } = process.env;

const app = express();
const port = PORT;


app.get("/orders/", async (req, res) => {
  try {
    const data = await dbConnection.query("SELECT * FROM orders");
    res.json({
      code: 200,
      operation: "success",
      description: "Fetched all orders",
      data: data.rows,
    });
  } catch (e) {
    console.error(Error(e));
    res.status(500).send("Something happened");
  }
});


app.listen(port, () => console.log(`Server running on port ${port}`));
