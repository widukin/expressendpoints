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
  create: async (req, res) => {
    const { price, date, user_id } = req.body;
    // validation on the fields
    // if statement to check that all 3 exist, that they are not empty
    
    try {
      const dbResponse = await dbConnection.query(
        `INSERT INTO "orders" (price, date, user_id) 
        VALUES ($1, $2, $3) 
        RETURNING *;`, [
        price,
        date,
        user_id,
      ]);
      res.json({
        code: 200,
        operation: "success",
        description: "Insert order for user " + user_id,
        data: dbResponse.rows[0],
      })
    } catch (error) {
      console.error(Error(e));
      res.status(500)
        .json({
          code: 500,
          message: "Error trying to insert a new order for user" + user_id
        })
        .send("ERROR occurred - cannot create Order today");
    }
  },
}