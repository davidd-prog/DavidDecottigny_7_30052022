const Post = require("../models/Post");
const fs = require("fs");

// Mécanique de création d'un post
exports.createPost = (req, res, next) => {
  console.log(req.body);
  const postObject = req.body;

  // postObject = JSON.parse(req.body);

  const post = new Post({
    ...postObject,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Mécanique de récupération de tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll()
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
      return res.status(403).json({
        error: new Error("Requête non autorisée"),
      });
    }
  });
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Post.update(
    { where: { id: req.params.id } },
    { ...postObject, where: { id: req.params.id } }
  )
    .then(() => res.status(200).json({ message: "Post mis à jour" }))
    .catch((error) => res.status(400).json({ error }));
};

// Mécanique de suppression d'un post
exports.deleteOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          error: new Error("Post non trouvé"),
        });
      }
      if (post.id !== req.auth.userId || user.isadmin != 1) {
        return res.status(403).json({
          error: new Error("Requête non autorisée"),
        });
      }
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({
              message: "Post supprimé",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Mécanique d'évaluation d'un post
exports.likePost = (req, res, next) => {};
