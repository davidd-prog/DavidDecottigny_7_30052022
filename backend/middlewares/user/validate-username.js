// Validation du pseudonyme de l'utilisateur
module.exports = (req, res, next) => {
  try {
    const userNamelValidate = (userName) => {
      if (!userName || "" == userName || undefined == userName) {
        throw "First name invalide";
      } else {
        next();
      }
    };
    userNamelValidate(req.body.userName);
  } catch {
    res.status(401).json({
      message: "Votre nom d'utilisateur n'est pas valide !",
    });
  }
};
