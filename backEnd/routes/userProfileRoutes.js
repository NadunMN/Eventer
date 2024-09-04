const express = require("express");
const router = express.Router();
const {
  countRegisteredEvent,
  countCreatedEvent,
  countFavoriteEvent,
  getUserOne,
} = require("../controllers/userProfileController");

router.get("/countRegisteredEvent", countRegisteredEvent);
router.get("/countCreatedEvent", countCreatedEvent);
router.get("/countFavoriteEvent", countFavoriteEvent);
router.get("/getUserOne/:id", getUserOne); 

module.exports = router;
