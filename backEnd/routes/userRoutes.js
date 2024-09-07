const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUser,
  signup,
  login,
  editUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getAllUser);
router.get("/:id", getUser);
router.post("/signup", signup);
router.post("/login", login);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
