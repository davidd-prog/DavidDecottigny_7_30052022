// Routing des requêtes post
const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts");
const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.updateOnePost);
router.delete("/:id", auth, postCtrl.deleteOnePost);
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;
