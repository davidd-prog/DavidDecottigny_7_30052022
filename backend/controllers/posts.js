const Post = require("../models/Post");
const Like = require("../models/Like");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { post } = require("../routes/user");

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
    Post.findOne({
      where: { id: req.params.id },
    }).then((post) => {
      if (!post) {
        return res.status(404).json({
          error: new Error("Post non trouvé !"),
        });
      }
      if (post.userId !== req.auth.userId && req.auth.userAdmin == 0) {
        console.log("ici");
        return res.status(403).json({
          error: new Error("Requête non autorisée !"),
        });
      } else if (post.userId == req.auth.userId || req.auth.userAdmin == 1) {
        console.log("ici aussi");
        if (req.file) {
          console.log("mais aussi ici");
          const filename = post.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            const postObject = {
              content: req.body.content,
              image: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            };
            Post.update(
              {
                ...postObject,
              },
              { where: { id: req.params.id } }
            )
              .then(() => res.status(200).json({ message: "Post mis à jour" }))
              .catch((error) => res.status(401).json({ error }));
          });
        } else if (post.image == req.body.image) {
          console.log("et là");
          const contentPost = req.body;
          const oldImage = post.image;
          contentPost.image = oldImage;
          Post.update(
            {
              ...contentPost,
            },
            { where: { id: req.params.id } }
          )
            .then(() => res.status(200).json({ message: "Post mis à jour" }))
            .catch((error) => res.status(401).json({ error }));
        } else {
          console.log("ou encore ici");
          const filename = post.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            const postObject = {
              content: req.body.content,
              image: req.body.image,
            };
            Post.update(
              {
                ...postObject,
              },
              { where: { id: req.params.id } }
            )
              .then(() => res.status(200).json({ message: "Post mis à jour" }))
              .catch((error) => res.status(401).json({ error }));
          });
        }
      }
    });
  } else {
    console.log("mais aussi là");
    res.status(401).json({ error: "Requête non authentifiée !" });
  }
};

// Mécanique de suppression d'un post

exports.deleteOnePost = (req, res, next) => {
  const isAuth = auth(req, res);
  if (isAuth) {
    Post.findOne({ where: { id: req.params.id } })
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            error: new Error("Post non trouvé !"),
          });
        }
        if (post.userId !== req.auth.userId && req.auth.userAdmin == 0) {
          return res.status(403).json({
            error: new Error("Requête non autorisée !"),
          });
        } else if (post.userId == req.auth.userId || req.auth.userAdmin == 1) {
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
        }
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    res.status(401).json({ error: "Requête non authentifiée !" });
  }
};

// Mécanique d'évaluation d'un post

exports.likePost = (req, res, next) => {
  const isAuth = auth(req, res);
  const like = req.body.likes;
  const likes = post.likes;

  if (isAuth) {
    Post.findOne({ where: { id: req.params.id } })
      .then((post) => {
        console.log(post.likes);
        if (!post) {
          return res.status(404).json({
            error: new Error("Post non trouvé !"),
          });
        } else {
          console.log("niveau passé");
        }
        if (like == 1) {
          // Vérifier que l'userId n'existe pas encore dans la table postlike
          console.log(like, req.params.id);
          Post.update(
            {
              likes: post.likes + 1,
            },
            { where: { id: req.params.id } }
          )
            .then(() => {
              Like.create({
                userId: req.body.userId,
                postId: req.params.id,
              })
                .then(() => res.status(201).json({ message: "post liké" }))
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(401).json({ error })),
            console.log("erreur ici");
        }
        if (like == 0) {
          Like.findOne({
            where: { userId: req.body.userId, postId: req.params.id },
          })
            .then(() => {
              if ({ userId: req.body.userId, postId: req.params.id }) {
                Like.destroy({
                  where: { userId: req.body.userId, postId: req.params.id },
                })
                  .then(
                    Post.update(
                      {
                        likes: post.likes - 1,
                      },
                      { where: { id: req.params.id } }
                    )
                      .then(res.status(200).json({ message: "Like supprimé" }))
                      .catch()
                  )
                  .catch((error) => {
                    console.log("ici");
                    res.status(404).json({
                      error: new Error("Erreur de mise à jour des like"),
                    });
                  });
              }
            })
            .catch((error) => {
              console.log("là");
              res
                .status(404)
                .json({ error: new Error("Utilisateur non trouvé !") });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({ error }), console.log("toto");
      });
  } else {
    res.status(401).json({ error: "Requête non authentifiée !" });
  }
};

// Fonction d'authentification
function auth(req, res) {
  let isAuth = false;

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;
  const userAdmin = decodedToken.userAdmin;

  req.auth = { userId, userAdmin };

  if (req.body.userId == userId) {
    isAuth = true;
  } else {
    isAuth = false;
  }

  return isAuth;
}
