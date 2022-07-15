// Routing des requêtes post
const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts");
const multer = require("../middlewares/multer-config");

router.post("/", multer, postCtrl.createPost);
router.get("/",  postCtrl.getAllPosts);
router.get("/:id", postCtrl.getOnePost);
router.put("/:id", multer, postCtrl.updateOnePost);
router.delete("/:id", postCtrl.deleteOnePost);
router.post("/:id/like", postCtrl.likePost);

module.exports = router;
