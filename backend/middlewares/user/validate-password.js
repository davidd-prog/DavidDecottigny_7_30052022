const passwordValidator = require("password-validator");

module.exports = (req, res, next) => {
  try {
    const passwordValidate = (password) => {
      // Creation du schema
      const passwordSchema = new passwordValidator();

      //Ajout des propriétés
      passwordSchema
        .is()
        .min(6)
        .is()
        .max(20)
        .has()
        .uppercase()
        .has()
        .lowercase()
        .has()
        .digits(2)
        .has()
        .not()
        .spaces()
        .is()
        .not()
        .oneOf(["Passw0rd", "Password123"]);

      if (passwordSchema.validate(password)) {
        next();
      } else {
        throw "Password invalide";
      }
    };
    passwordValidate(req.body.password);
  } catch {
    res.status(401).json({
      message:
        "Mot de passe trop faible. Veuillez saisir: 1 majuscule, 1 minuscule, 2 chiffres, 6 caractères minimum.",
    });
  }
};