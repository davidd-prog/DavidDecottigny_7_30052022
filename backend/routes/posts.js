// Routing des requêtes post
const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, postCtrl.updateOnePost);
router.delete("/:id", auth, postCtrl.deleteOnePost);
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;
