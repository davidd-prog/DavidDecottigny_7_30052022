const Sequelize = require("sequelize");
const database = require("../config/database");
const User = database.define("user", {
  iduser: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  isadmin: { type: Sequelize.TINYINT, allowNull: false },

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
module.exports = User;
