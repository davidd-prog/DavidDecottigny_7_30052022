const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const validateEmail = require("../middlewares/user/validate-email");
const validatePassword = require("../middlewares/user/validate-password");
const validateUsername = require("../middlewares/user/validate-username");

router.post(
  "/signup",
  validateEmail,
  validateUsername,
  validatePassword,
  userCtrl.signup
);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser);
// router.put("/:id", userCtrl.updateUser);
// router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
