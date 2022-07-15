const User = require("../models/User");
const Sequelize = require("sequelize");
const database = require("../config/database");

const Post = database.define("post", {
  // title: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.STRING, allowNull: false },
  image: { type: Sequelize.STRING, allowNull: true },
  likes: { type: Sequelize.INTEGER, allowNull: false, default: 0 },

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
module.exports = Post;
User.hasMany(Post);
Post.belongsTo(User, { onDelete: "CASCADE" });
