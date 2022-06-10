const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// mécanique d'enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        id: req.body.id,
        email: req.body.email,
        username: req.body.username,
        isadmin: req.body.isadmin,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Mécanique de connexion de l'utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user.id,
            username: user.username,
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
            message: "Utilisateur connecté !",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      // console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => res.status(400).json({ error }));
};

// Modifier un profil Utilisateur
exports.updateUser = (req, res, next) => {};

// Supprimer un profil Utilisateur
exports.deleteUser = (req, res, next) => {};
