// Installation et import du framework express
const express = require("express");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");

// Création de l'application express
const app = express();

// Import de la mécanique de connexion à la base de données
const database = require("./config/database");

// Route utilisateur
app.use("/api", userRoutes);

// Route post
app.use("/api", postRoutes);

// Synchronisation avec les tables définies
database.sync();

// Export de l'application afin de pouvoir notamment envoyer des requêtes au serveur
module.exports = app;

