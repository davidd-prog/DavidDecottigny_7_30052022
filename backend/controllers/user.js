const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// mécanique d'enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      if (req.body.isadmin == null) {
        req.body.isadmin = 0;
      }
      const user = new User({
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
  User.findOne({ where: { email: req.body.email } })
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
            email: user.email,
            username: user.username,
            userAdmin: user.isadmin,
            token: jwt.sign(
              { userId: user.id, userAdmin: user.isadmin },
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "24h",
              }
            ),
            message: "Utilisateur connecté !",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
  User.findAll({ attributes: { exclude: ["password"] } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(400).json({ error }));
};

// Récupérer un profil utilisateur
exports.getUser = (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

// Modifier un profil Utilisateur
exports.updateUser = (req, res, next) => {
  console.log(req.query);
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    console.log(user);
    if (!user) {
      return res.status(404).json({
        error: new Error("Utilisateur non trouvé"),
      });
    }
    User.update(
      {
        username: req.body.username,
        email: req.body.email,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() =>
        res.status(200).json({ message: "Profil utilisateur mis à jour" })
      )
      .catch((error) => res.status(400).json({ error }));
  });
};

// Supprimer un profil Utilisateur

exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: new Error("user non trouvé"),
        });
      }
      if (user.id !== req.auth.userId || user.isadmin != 1) {
        console.log("ça tombe ici");
        return res.status(403).json({
          error: new Error("Requête non autorisée !"),
        });
      }
      User.destroy({ where: { id: req.params.id } })
        .then(() =>
          res.status(200).json({
            message: "Utilisateur supprimé !",
          })
        )
        .catch((error) =>
          res.status(400).json({
            error,
          })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};
