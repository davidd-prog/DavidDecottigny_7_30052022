const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const userAdmin = decodedToken.isadmin;
    req.auth = { userId, userAdmin };
    if (
      (req.body.userId && req.body.userId !== userId) ||
      (req.body.userAdmin && req.body.userAdmin != 1)
    ) {
      throw "User ID non valable !";
    } else {
      console.log("ça fonctionne");
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};

//token || isadmin == 1
