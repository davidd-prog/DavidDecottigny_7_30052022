const Sequelize = require("sequelize");
const database = require("../config/database");
const User = database.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      min: 2,
      max: 20,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
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
      isAlphanumeric: true,
      isDecimal: true,
      isLowercase: true,
      isUppercase: true,
      notNull: true,
      notEmpty: true,
      notIn: [["abcdef", "123456"]],
      len: [6, 20],
    },
  },
  isadmin: { type: Sequelize.TINYINT, allowNull: false },

  // createdAt: Sequelize.DATE,
  // updatedAt: Sequelize.DATE,
});
module.exports = User;
