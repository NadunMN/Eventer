const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUser,
  register,
} = require("../controllers/userController");

router.get("/users", getAllUser);
router.get("/user/:id", getUser);
router.post("/register", register);

module.exports = router;
