const dbConnection = require("../db.config");

module.exports = {
  getAll: async (req, res) => {
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
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
  
      const order = await dbConnection.query("SELECT * FROM orders WHERE id=$1", [id]);
      res.json({
        code: 200,
        operation: "success",
        description: "Fetched all orders",
        data: order.row,
      });
    } catch (e) {
      console.error(Error(e));
      res.status(500).send("ERROR occurred - no Order for you today");
    }
  },
}