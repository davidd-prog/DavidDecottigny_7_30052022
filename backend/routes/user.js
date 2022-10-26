// Routing des requêtes utilisateur
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const validateEmail = require("../middlewares/user/validate-email");
const validatePassword = require("../middlewares/user/validate-password");
const validateFirstname = require("../middlewares/user/validate-firstname");
const validateLastname = require("../middlewares/user/validate-lastname");
const auth = require("../middlewares/auth");

router.post(
  "/signup",
  validateEmail,
  validateFirstname,
  validateLastname,
  validatePassword,
  userCtrl.signup
);
router.post("/login", userCtrl.login);
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
