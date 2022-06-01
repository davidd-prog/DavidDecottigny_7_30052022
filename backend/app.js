// Installation et import du framework express
const express = require("express");

// Création de l'application express
const app = express();

// Export de l'application afin de pouvoir notamment envoyer des requêtes au serveur
module.exports = app;
