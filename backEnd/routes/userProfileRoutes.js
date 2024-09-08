const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../middleware/uploadMiddleware.js");
const requireAuth = require("../middleware/requireAuth");

const {
  countRegisteredEvent,
  countCreatedEvent,
  countFavoriteEvent,
  getUserById,
  updateUser,
  updatedUserImage,
} = require("../controllers/userProfileController");

router.get("/countRegisteredEvent", countRegisteredEvent);
router.get("/countCreatedEvent", countCreatedEvent);
router.get("/countFavoriteEvent", countFavoriteEvent);
router.get("/getUserById/:id", getUserById);
router.put("/updateUser/:id", requireAuth, updateUser);
router.put("/updatedUserImage/:id", requireAuth, upload, updatedUserImage);

module.exports = router;
