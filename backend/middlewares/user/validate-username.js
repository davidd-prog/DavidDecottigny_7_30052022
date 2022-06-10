// Validation du pseudonyme de l'utilisateur
module.exports = (req, res, next) => {
  try {
    const usernamelValidate = (username) => {
      if (!username || "" == username || undefined == username) {
        throw "First name invalide";
      } else {
        next();
      }
    };
    usernamelValidate(req.body.username);
  } catch {
    res.status(401).json({
      message: "Votre nom d'utilisateur n'est pas valide !",
    });
  }
};
