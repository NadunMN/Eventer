const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUser,
  register,
  signup,
  login,
} = require("../controllers/userController");

router.get("/users", getAllUser);
router.get("/user/:id", getUser);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
