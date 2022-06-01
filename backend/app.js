// Installation et import du framework express
const express = require("express");

// Import du module de chargement des variables d'environnement
const dotenv = require("dotenv");

// Création de l'application express
const app = express();

// Export de l'application afin de pouvoir notamment envoyer des requêtes au serveur
module.exports = app;
