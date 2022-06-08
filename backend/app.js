// Installation et import du framework express
const express = require("express");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");

// Création de l'application express
const app = express();

// Traitement du contenu json dans les requêtes
app.use(express.json());

// Paramètres permettant l'accès à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Import de la mécanique de connexion à la base de données
const database = require("./config/database");

// Route utilisateur
app.use("/api", userRoutes);

// Route post
app.use("/api/posts", postRoutes);

// Synchronisation avec les tables définies
database.sync();

// Export de l'application afin de pouvoir notamment envoyer des requêtes au serveur
module.exports = app;
