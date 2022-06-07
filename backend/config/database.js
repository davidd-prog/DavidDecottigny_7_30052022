const Sequelize = require("sequelize");

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
  console.log("=> Connection has been established successfully.");
} catch (error) {
  console.error("=> Unable to connect to the database:", error);
}

module.exports = sequelize;
