const Sequelize = require("sequelize");
const database = require("../config/database");
const Post = database.define("post", {
  // idpost: {
  //   type: Sequelize.INTEGER,
  //   autoIncrement: true,
  //   allowNull: false,
  //   primaryKey: true,
  // },
  title: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.STRING, allowNull: false },
  attachment: { type: Sequelize.STRING, allowNull: true },
  likes: { type: Sequelize.INTEGER, allowNull: false, default: 0 },

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
module.exports = Post;
