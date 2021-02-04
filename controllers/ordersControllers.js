const dbConnection = require("../db.config");

module.exports = {
  getAll: async (req, res) => {
    try {
      const orders = await dbConnection.query(
        `SELECT 
          json_build_object(
            'id', orders.id,
            'price', orders.price,
            'date', orders.date,
            'user_id', orders.user_id,
            'user', json_build_object(
              'id', users.id,
              'first_name', users.first_name,
              'last_name', users.last_name,
              'age', users.age
            )
          ) 
        FROM orders 
        JOIN users ON users.id = orders.user_id`);
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
  
      const order = await dbConnection.query(
        `SELECT 
          json_build_object(
            'id', orders.id,
            'price', orders.price,
            'date', orders.date,
            'user_id', orders.user_id,
            'user', json_build_object(
              'id', users.id,
              'first_name', users.first_name,
              'last_name', users.last_name,
              'age', users.age
            )
          ) 
        FROM orders 
        JOIN users ON users.id = orders.user_id 
        WHERE orders.id=$1`, 
      [id]);
      res.json({
        code: 200,
        operation: "success",
        description: "Fetched all orders",
        data: order.rows,
      });
    } catch (e) {
      console.error(Error(e));
      res.status(500).send("ERROR occurred - no Order for you today");
    }
  },
}