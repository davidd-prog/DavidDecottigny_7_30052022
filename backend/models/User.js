// Modèle pour la table user
module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [2, 20],
        isAlphanumeric: true,
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
    isadmin: { type: Sequelize.TINYINT, allowNull: false },
  });
  return user;
};
