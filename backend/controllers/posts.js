const Post = require("../models/Post");
const User = require("../models/User");
const Like = require("../models/Like");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { post } = require("../routes/user");

// Mécanique de création d'un post
exports.createPost = (req, res, next) => {
  // Création du post
  const post = new Post({
    ...req.body,
    userId: req.auth.userId,
    likes: req.body.likes || 0,
  });
  if (req.file) {
    post.image = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    post.image = null;
  }
  post
    .save()
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Mécanique de récupération de tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll({ order: [["createdAt", "DESC"]], include: User })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Mécanique de récupération d'un seul post
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

// Mécanique de modification d'un post

exports.updateOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
  }).then((post) => {
    if (!post) {
      return res.status(404).json({
        error: new Error("Post non trouvé !"),
      });
    }
    if (post.userId === req.auth.userId || req.auth.userAdmin) {
      if (req.file && !req.body.content) {
        if (post.image) {
          const filename = post.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});
        }
        Post.update(
          {
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          },
          { where: { id: req.params.id } }
        )
          .then(() => res.status(200).json({ message: "Post mis à jour" }))
          .catch((error) => res.status(401).json({ error }));
      } else if (req.file && req.body.content) {
        if (post.image) {
          const filename = post.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});
        }
        Post.update(
          {
            ...req.body,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          },
          { where: { id: req.params.id } }
        )
          .then(() => res.status(200).json({ message: "Post mis à jour" }))
          .catch((error) => res.status(401).json({ error }));
      } else {
        Post.update(
          { ...req.body, image: post.image },
          { where: { id: req.params.id } }
        )
          .then(() => res.status(200).json({ message: "Post mis à jour" }))
          .catch((error) => res.status(401).json({ error }));
      }
    } else {
      return res.status(403).json({
        error: new Error("Requête non autorisée !"),
      });
    }
  });
};

// Mécanique de suppression d'un post

exports.deleteOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: new Error("Post non trouvé !"),
        });
      }
      if (post.userId === req.auth.userId || req.auth.userAdmin) {
        if (post.image) {
          const filename = post.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});
        }
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post sans supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        return res.status(403).json({
          error: new Error("Requête non autorisée !"),
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Mécanique d'évaluation d'un post

exports.likePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      Like.findOne({
        where: { userId: req.auth.userId, postId: req.params.id },
      }).then((liker) => {
        if (!liker) {
          Post.update(
            {
              likes: post.likes + 1,
            },
            { where: { id: req.params.id } }
          ).then(
            console.log(post.likes),
            Like.create({
              userId: req.auth.userId,
              postId: req.params.id,
            })
              .then(() => res.status(201).json({ message: "post liké" }))
              .catch(() =>
                res.status(401).json({ message: "impossible de liker le post" })
              )
          );
        } else {
          Post.update(
            {
              likes: post.likes - 1,
            },
            { where: { id: req.params.id } }
          ).then(
            console.log(post.likes),
            Like.destroy({
              where: { userId: req.auth.userId, postId: req.params.id },
            })
              .then(() => res.status(201).json({ message: "like supprimé" }))
              .catch(() =>
                res
                  .status(401)
                  .json({ message: "impossible de supprimer le like" })
              )
          );
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
