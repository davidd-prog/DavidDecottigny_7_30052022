const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// mécanique d'enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then().catch();
};

// Mécanique de connexion de l'utilisateur
exports.login = (req, res, next) => {};
