// Installation et import du framework express
const express = require("express");

// Création de l'application express
const app = express();

// Export de l'application afin de pouvoir notamment envoyer des requêtes au serveur
module.exports = app;

// Import de la mécanique de connexion à la base de données
const database = require("./config/database");

// Test de connexion à la base de donnée
try {
  database.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
