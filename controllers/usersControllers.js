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
      const dbResponse = await dbConnection.query("SELECT * FROM orders WHERE id=$1", [id]);
      res.json({
        code: 200,
        operation: "success",
        description: "Fetched all orders",
        data: dbResponse.rows,
      });
    } catch (e) {
      console.log("here");
      console.error("h2", Error(e));
      res.status(500).send("ERROR occurred - no User for you today");
    }
  },
  /* create: async () */
}