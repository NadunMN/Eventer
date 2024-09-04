const express = require("express");
const router = express.Router();
const {
  countRegisteredEvent,
  countCreatedEvent,
  countFavoriteEvent,
  getUserById,
  updateUser,
} = require("../controllers/userProfileController");

router.get("/countRegisteredEvent", countRegisteredEvent);
router.get("/countCreatedEvent", countCreatedEvent);
router.get("/countFavoriteEvent", countFavoriteEvent);
router.get("/getUserById/:id", getUserById); 
router.put("/updateUser/:id", updateUser);

module.exports = router;
