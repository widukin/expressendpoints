const dbConnection = require("../db.config");
module.exports = {
  verify: async (req, res, next) => {
    try {
      const { auth_token } = req.query;
      const dbResponse = await dbConnection.query(
        "SELECT value FROM tokens WHERE value=$1",
        [auth_token]
      );
      /* no authentification */
      if (!auth_token || auth_token !== dbResponse.rows[0].value) {
        console.log("no auth_token");
        res.status(401).json({
          error: "No Authentification",
          code: 401,
        });
        return;
      }
      /* authenticated */
      console.log("authenticated user");
      next();
    } catch (e) {
      console.error(Error(e));
      res.status(500).send("ERROR occurred - no Token");
    }
  },
};
