// Routing des requêtes post
const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts");

router.post("/", postCtrl.createPost);
router.get("/", postCtrl.getAllPosts);
router.get("/:id", postCtrl.getOnePost);
router.put("/:id", postCtrl.updateOnePost);
router.delete("/:id", postCtrl.deleteOnePost);
router.post("/:id/like", postCtrl.likePost);

module.exports = router;
