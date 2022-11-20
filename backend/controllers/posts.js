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
// exports.updateOnePost = (req, res, next) => {
//   Post.findOne({
//     where: { id: req.params.id },
//   }).then((post) => {
//     if (!post) {
//       return res.status(404).json({
//         error: new Error("Post non trouvé !"),
//       });
//     }
//     if (post.userId === req.auth.userId || req.auth.isAdmin) {
//       console.log(req.file, req.body.file, post.image, req.body.content);
//       if (req.file && !req.body.content) {
//         if (post.image) {
//           const filename = post.image.split("/images/")[1];
//           fs.unlink(`images/${filename}`, () => {});
//         }
//         Post.update(
//           {
//             image: `${req.protocol}://${req.get("host")}/images/${
//               req.file.filename
//             }`,
//           },
//           { where: { id: req.params.id } }
//         )
//           .then(() => {
//             console.log("Ca fonctionne");
//             res.status(200).json({ message: "Post mis à jour" });
//           })
//           .catch((error) => {
//             console.log("ça ne fonctionne pas");
//             res.status(401).json({ error });
//           });
//       }
//     }
//   });
// };

exports.updateOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
  }).then((post) => {
    if (!post) {
      return res.status(404).json({
        error: new Error("Post non trouvé !"),
      });
    }
    if (post.userId === req.auth.userId || req.auth.isAdmin) {
      console.log(req.file);
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
      if (post.userId === req.auth.userId || req.auth.isAdmin) {
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
            Like.create({
              userId: req.auth.userId,
              postId: req.params.id,
            })
              .then(() => res.status(201).json({ message: "post liké" }))
              .catch((error) =>
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
            Like.destroy({
              where: { userId: req.auth.userId, postId: req.params.id },
            })
              .then(() => res.status(201).json({ message: "like supprimé" }))
              .catch((error) =>
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

// exports.likePost = (req, res, next) => {
//   const isAuth = auth(req, res);
//   const likes = req.body.likes;

//   if (isAuth) {
//     console.log("authentifié");
//     Post.findOne({ where: { id: req.params.id } })
//       .then((post) => {
//         console.log(post.id);
//         if (likes == 1) {
//           console.log(likes),
//             Like.findOne({
//               where: { userId: req.body.userId, postId: req.params.id },
//             })
//               .then((liker) => {
//                 console.log(liker);
//                 if (!liker) {
//                   console.log(
//                     "Ok ! On peut constituer un endroit pour ce liker"
//                   );
//                   Post.update(
//                     {
//                       likes: post.likes + 1,
//                     },
//                     { where: { id: req.params.id } }
//                   )
//                     .then(
//                       Like.create({
//                         userId: req.body.userId,
//                         postId: req.params.id,
//                       }).then(() =>
//                         console.log("Une bonne installation bien faite !")
//                       )
//                     )
//                     .catch();
//                 } else {
//                   console.log("Ah non ! Vous avez déjà un compte chez nous !");
//                 }
//               })
//               .catch(console.log("Pas de liker trouvé"));
//         } else if (likes == 0) {
//           console.log("ce n'est pas égal à 1");
//           Like.findOne({
//             where: { userId: req.body.userId, postId: req.params.id },
//           })
//             .then((liker) => {
//               if (liker) {
//                 console.log("Ok ! On peut retirer ce liker");
//                 Post.update(
//                   {
//                     likes: post.likes - 1,
//                   },
//                   { where: { id: req.params.id } }
//                 ).then(
//                   Like.destroy({
//                     where: { userId: req.body.userId, postId: req.params.id },
//                   })
//                     .then(console.log("like supprimé"))
//                     .catch(console.log("impossible de supprimer ce like"))
//                 );
//               } else {
//                 console.log(
//                   "Désolé, les prochaines réservations sont pour l'années prochaine"
//                 );
//               }
//             })
//             .catch(console.log("Aucun liker trouvé"));
//         }
//       })
//       .catch(console.log("post introuvable"));
//   } else {
//     console.log("non authentifié");
//   }
// };

// if (isAuth) {
//   Post.findOne({ where: { id: req.params.id } })
//     .then((post) => {
//       // console.log(post.likes, userId, postId);
//       if (!post) {
//         return res.status(404).json({
//           error: new Error("Post non trouvé !"),
//         });
//       } else {
//         console.log("niveau passé");
//       }
//       if (like == 1) {
//         Like.findOne({
//           where: { userId: req.body.userId, postId: req.params.id },
//         })
//           .then(() => {
//             console.log(userId);
//             if (Like.userId !== req.auth.userId) {
//               Post.update(
//                 {
//                   likes: post.likes + 1,
//                 },
//                 { where: { id: req.params.id } }
//               )
//                 .then(() => {
//                   Like.create({
//                     userId: req.body.userId,
//                     postId: req.params.id,
//                   })
//                     .then(() => res.status(201).json({ message: "post liké" }))
//                     .catch((error) => res.status(400).json({ error }));
//                 })
//                 .catch((error) => res.status(401).json({ error }));
//             }
//           })
//           .catch((error) => res.status(400).json({ error })),
//           console.log("erreur ici");
//         // Vérifier que l'userId n'existe pas encore dans la table postlike
//         console.log(like, req.params.id);
//       }
//       if (like == 0) {
//         Like.findOne({
//           where: { id: req.params.id },
//         })
//           .then(() => {
//             if (userId && postId) {
//               Like.destroy({
//                 where: { userId: req.body.userId, postId: req.params.id },
//               })
//                 .then(
//                   Post.update(
//                     {
//                       likes: post.likes - 1,
//                     },
//                     { where: { id: req.params.id } }
//                   )
//                     .then(res.status(200).json({ message: "Like supprimé" }))
//                     .catch()
//                 )
//                 .catch((error) => {
//                   console.log("ici");
//                   res.status(404).json({
//                     error: new Error("Erreur de mise à jour des like"),
//                   });
//                 });
//             }
//           })
//           .catch((error) => {
//             console.log("là");
//             res
//               .status(404)
//               .json({ error: new Error("Utilisateur non trouvé !") });
//           });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ error }), console.log("toto");
//     });
// } else {
//   res.status(401).json({ error: "Requête non authentifiée !" });
// }

//   if (isAuth) {
//     Post.findOne({ where: { id: req.params.id } })
//       .then((post) => {
//         // console.log(post.likes, userId, postId);
//         if (!post) {
//           return res.status(404).json({
//             error: new Error("Post non trouvé !"),
//           });
//         } else {
//           console.log("niveau passé");
//         }
//         if (likes == 1) {
//           Like.findOne({
//             where: { id: req.params.id },
//           })
//             .then(() => {
//               // console.log(userId);
//               if (req.body.userId && req.params.id) {
//                 Post.update(
//                   {
//                     likes: post.likes + 1,
//                   },
//                   { where: { id: req.params.id } }
//                 )
//                   .then(() => {
//                     Like.create({
//                       userId: req.body.userId,
//                       postId: req.params.id,
//                     })
//                       .then(() =>
//                         res.status(201).json({ message: "post liké" })
//                       )
//                       .catch((error) => res.status(400).json({ error }));
//                   })
//                   .catch((error) => res.status(401).json({ error })),
//                   console.log("erreur ici");
//               } else {
//                 console.log("Ce post a déjà été liké");
//               }
//             })
//             .catch({ error: new Error("Post non trouvé !") });
//           // Vérifier que l'userId n'existe pas encore dans la table postlike
//           console.log(like, req.params.id, Like.userId, Like.postId);
//         }
//         if (likes == 0) {
//           Like.findOne({
//             where: { userId: req.body.userId, postId: req.params.id },
//           })
//             .then(() => {
//               if ({ userId: req.body.userId, postId: req.params.id }) {
//                 Like.destroy({
//                   where: { userId: req.body.userId, postId: req.params.id },
//                 })
//                   .then(
//                     Post.update(
//                       {
//                         likes: post.likes - 1,
//                       },
//                       { where: { id: req.params.id } }
//                     )
//                       .then(res.status(200).json({ message: "Like supprimé" }))
//                       .catch()
//                   )
//                   .catch((error) => {
//                     console.log("ici");
//                     res.status(404).json({
//                       error: new Error("Erreur de mise à jour des like"),
//                     });
//                   });
//               }
//             })
//             .catch((error) => {
//               console.log("là");
//               res
//                 .status(404)
//                 .json({ error: new Error("Utilisateur non trouvé !") });
//             });
//         }
//       })
//       .catch((error) => {
//         res.status(500).json({ error }), console.log("toto");
//       });
//   } else {
//     res.status(401).json({ error: "Requête non authentifiée !" });
//   }
// };

// Fonction d'authentification
function auth(req, res) {
  let isAuth = false;

  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  console.log(decodedToken);
  const userId = decodedToken.userId;
  const userAdmin = decodedToken.userAdmin;

  req.auth = { userId, userAdmin };
  console.log(req.body);
  if (req.body.userId == userId) {
    isAuth = true;
  } else {
    isAuth = false;
  }

  return isAuth;
}

// Fonction de vérification de la présence ou non d'un user dans la table postLike

// function likeUsers(req, res) {
//   const token = req.headers.authorization.split(" ")[1];
//   const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
//   const userId = decodedToken.userId;
//   const userAdmin = decodedToken.userAdmin;
//   req.auth = { userId, userAdmin };
//   let liker = false;

//   let likeUser = Like.findOne({
//     where: { userId: req.body.userId, postId: req.params.id },
//   });

//   console.log(likeUser);

//   if ((likeUser = true)) {
//     liker = true;
//   } else {
//     liker = false;
//   }

//   return liker;
// }

// const likeUsers = (req, res) => {
//   const token = req.headers.authorization.split(" ")[1];
//   const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
//   const userId = decodedToken.userId;
//   const userAdmin = decodedToken.userAdmin;
//   req.auth = { userId, userAdmin };
//   let liker = false;
//   const likeUserFound = Like.findOne({
//     where: { userId: req.body.userId, postId: req.params.id },
//   });

//   let likeUser = likeUserFound.userId;
//   console.log(likeUserFound);

//   if ((likeUser = true)) {
//     liker = true;
//   } else {
//     liker = false;
//   }

//   return liker;
// };
