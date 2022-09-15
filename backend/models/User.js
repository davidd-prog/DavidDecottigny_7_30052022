// Modèle pour la table user

const Sequelize = require("sequelize");
const database = require("../config/database");
const User = database.define("user", {
  firstname: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [2, 20],
      isAlpha: true,
    },
  },
  lastname: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [2, 20],
      isAlpha: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      notIn: ["abcdef", "123456"],
    },
  },
  isadmin: { type: Sequelize.TINYINT, defaultValue: 0 },
});

module.exports = User;
