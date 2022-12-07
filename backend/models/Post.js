const User = require("../models/User");
const Sequelize = require("sequelize");
const database = require("../config/database");

const Post = database.define("post", {
  content: { type: Sequelize.STRING, allowNull: false },
  image: { type: Sequelize.STRING, allowNull: true },
  likes: { type: Sequelize.INTEGER, allowNull: false, default: 0 },
});
module.exports = Post;

User.hasMany(Post, { onDelete: "CASCADE", foreignKey: "userId" });
Post.belongsTo(User, { onDelete: "CASCADE" });
