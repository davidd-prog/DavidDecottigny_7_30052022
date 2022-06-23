// Modèle pour la table post
module.exports = (sequelize, Sequelize) => {
  const post = sequelize.define("post", {
    title: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.STRING, allowNull: false },
    image: { type: Sequelize.STRING, allowNull: true },
    likes: { type: Sequelize.INTEGER, allowNull: false, default: 0 },
  });
  return post;
};
