const Sequelize = require("sequelize");

// Chargement des variables d'environnement
require("dotenv").config();

// const dotenv = require("dotenv");
// const dotenvConfig = dotenv.config();
// console.log("dotenv");
// console.log(dotenv);

// console.log("dotenvConfig");
// console.log(dotenvConfig);

module.exports = new Sequelize(
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
