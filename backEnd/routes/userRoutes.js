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
const requireAuth = require("../middleware/requireAuth");

router.get("/", requireAuth, getAllUser);
router.get("/:id", getUser);
router.post("/signup", signup);
router.post("/login", login);
router.put("/edit/:id", requireAuth, editUser);
router.delete("/delete/:id", requireAuth, deleteUser);
router.post("/remove-event/:id", requireAuth, updateUser);
// router.put("/register/:id", registerForEvent);

module.exports = router;
