const dbConnection = require("../db.config");

module.exports = {
  getAll: async (_, res) => {
    try {
      const dbResponse = await dbConnection.query("SELECT * FROM users");
      res.json({
        message: "Successfully found all users",
        code: 200,
        description: "Array of all users in db",
        data: dbResponse.rows,
      });
    } catch (e) {
      console.error(Error(e));
      res.sendStatus(500).send("ERROR occurred - no Users for you today");
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const dbResponse = await dbConnection.query("SELECT * FROM users WHERE id=$1", [id]);
      res.json({
        code: 200,
        operation: "success",
        description: "Fetched all orders",
        data: dbResponse.rows,
      });
    } catch (e) {
      console.error(Error(e));
      res.status(500).send("ERROR occurred - no User for you today");
    }
  },
  create: async (req, res) => {
    const { first_name, last_name, age } = req.body;
    // validation on the fields
    // if statement to check that all 3 exist, that they are not empty
    if (!first_name.trim().length || !last_name.trim().length || !age) {
      res.status(400).json({
        error: "Fields are invalid",
        code: 400,
      });
      return;
    }
    try {
      const dbResponse = await dbConnection.query(`INSERT INTO "users" (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *;`, [
        first_name,
        last_name,
        age,
      ]);
      res.json({
        code: 200,
        operation: "success",
        description: "Inserted user",
        data: dbResponse.rows[0],
      })
    } catch (error) {
      console.error(Error(e));
      res.status(500)
        .json({
          code: 500,
          message: "Error trying to insert a new user"
        })
        .send("ERROR occurred - cannot create User today");
    }
  }
}