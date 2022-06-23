// Authentification par le token et le statut d'administrateur
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const userAdmin = decodedToken.userAdmin;
    req.auth = { userId, userAdmin };
    console.log((req.params.id && req.params.id !== userId) || userAdmin != 1);
    if (req.params.id == userId || userAdmin == 1) {
      next();
    } else {
      throw "User ID non valable !";
    }
  } catch (error) {
    res.status(401).json({ error: "Requête non authentifiée !" });
  }
};
