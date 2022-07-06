// Configuration de la base de données
const Sequelize = require("sequelize");

const { post } = require("../routes/user");

// Chargement des variables d'environnement
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: 0,
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test de connexion à la base de donnée
try {
  sequelize.authenticate();
  console.log("=> La connection a été établie avec succès.");
} catch (error) {
  console.error("=> Impossible de se connecter à la base de données:", error);
}

// const db = {};

// // Récupération de la connexion à la base de données et du package Sequelize
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Récupération des modèles de la base de données
// db.user = require("../models/User")(sequelize, Sequelize);
// db.post = require("../models/Post")(sequelize, Sequelize);

// // Mise en relation des tables User et Post
// db.user.hasMany(db.post);
// db.post.belongsTo(db.user, { onDelete: "CASCADE" });
// db.sequelize.sync();

// module.exports = db;
 module.exports = sequelize;