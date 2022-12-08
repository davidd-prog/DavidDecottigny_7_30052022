// Vérification du token transmis par le user
require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const bearToken = req.headers.authorization;
    if (undefined === bearToken) {
      return res
        .status(401)
        .json({ error: new Error("Le token est introuvable !") });
    } else {
      const tokenSplice = bearToken.split(" ");
      if (undefined === tokenSplice[1]) {
        return res
          .status(401)
          .json({ error: new Error("Le token est introuvable !") });
      } else {
        const token = tokenSplice[1];
        const decodedToken = jwt.verify(
          token,
          `${process.env.RANDOM_TOKEN_SECRET}`
        );
        req.auth = {
          userId: decodedToken.userId,
          userAdmin: decodedToken.userAdmin,
        };
      }
    }
    next();
  } catch (error) {
    return res.status(401).json({
      error: new Error(
        "Une erreur inattendue s'est produite lors de la vérification du token."
      ),
    });
  }
};
