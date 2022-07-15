const Post = require("../models/Post");
const fs = require("fs");
const jwt = require("jsonwebtoken");

// Mécanique de création d'un post
exports.createPost = (req, res, next) => {
  const isAuth = auth(req, res);

  if (isAuth) {
    const postObject = req.body;

    // Contrôle d'authentification du user
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    postObject.userId = userId;

    // Création du post
    const post = new Post({
      ...postObject,
    });
    if (req.file) {
      post.image = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    post
      .save()
      .then(() => res.status(201).json({ message: "Post enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(401).json({ error: "Requête non authentifiée !" });
  }
};

// Mécanique de récupération de tous les posts
exports.getAllPosts = (req, res, next) => {
  const isAuth = auth(req, res);
  // console.log(isAuth);
  if (isAuth) {
    Post.findAll()
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(401).json({ error: "Requête non authentifiée !" });
  }
};

// Mécanique de récupération d'un seul post
exports.getOnePost = (req, res, next) => {
  const isAuth = auth(req, res);
  if (isAuth) {
    Post.findOne({
      where: { id: req.params.id },
    })
      .then((post) => res.status(200).json(post))
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(401).json({ error: "Requête non authentifiée !" });
  }
};

// Mécanique de modification d'un post
exports.updateOnePost = (req, res, next) => {
  const isAuth = auth(req, res);
  if (isAuth) {
    const postObject = req.file
      ? {
          ...req.body,
          image: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    Post.findOne({ where: { id: req.params.id } })
      .then((post) => {
        if (post) {
          Post.update(
            {
              ...postObject,
            },
            { where: { id: req.params.id } }
          )
            .then(() => res.status(200).json({ message: "Post mis à jour" }))
            .catch((error) => res.status(401).json({ error }));
        }
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    res.status(401).json({ error: "Requête non authentifiée !" });
  }
};

// Mécanique de suppression d'un post

exports.deleteOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post.image) {
        Post.destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: "Post sans image supprimé" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else {
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: req.params.id } })
            .then(() =>
              res.status(200).json({ message: "Post avec image supprimé" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Mécanique d'évaluation d'un post
exports.likePost = (req, res, next) => {};

// Fonction d'authentification
function auth(req, res) {
  let isAuth = false;

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  const userAdmin = decodedToken.userAdmin;

  if (req.body.userId == userId || userAdmin == 1) {
    isAuth = true;
  } else {
    isAuth = false;
  }

  return isAuth;
}
