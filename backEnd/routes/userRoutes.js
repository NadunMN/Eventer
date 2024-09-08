const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUser,
  signup,
  login,
  editUser,
  deleteUser,
  updateUser,
  // registerForEvent,
} = require("../controllers/userController");

router.get("/", getAllUser);
router.get("/:id", getUser);
router.post("/signup", signup);
router.post("/login", login);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);
router.post("/remove-event/:id", updateUser);
// router.put("/register/:id", registerForEvent);

module.exports = router;
