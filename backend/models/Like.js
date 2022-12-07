// Modèle pour la table like

const Sequelize = require("sequelize");
const database = require("../config/database");
const User = require("../models/User");
const Post = require("../models/Post");

const Like = database.define("postLike", {});
module.exports = Like;

// Relations avec les tables User et Post
Like.belongsTo(User, { onDelete: "CASCADE" });
Like.belongsTo(Post, { onDelete: "CASCADE" });
Post.hasMany(Like);
