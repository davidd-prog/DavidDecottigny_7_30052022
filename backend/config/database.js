const Sequelize = require("sequelize");
const { post } = require("../routes/user");

// Chargement des variables d'environnement
require("dotenv").config();

// const dotenv = require("dotenv");
// const dotenvConfig = dotenv.config();
// console.log("dotenv");
// console.log(dotenv);

// console.log("dotenvConfig");
// console.log(dotenvConfig);

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

module.exports = sequelize;
