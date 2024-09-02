const express = require("express");
const router = express.Router();
const {
  countRegisteredEvent,
  countCreatedEvent,
  countFavoriteEvent,
  getRegisteredEvents,
  getFavoriteEvents,
} = require("../controllers/userProfileController");

router.get("/countRegisteredEvent", countRegisteredEvent);
router.get("/countCreatedEvent", countCreatedEvent);
router.get("/countFavoriteEvent", countFavoriteEvent);
router.get("/getRegisteredEvents", getRegisteredEvents);
router.get("/getFavoriteEvents", getFavoriteEvents);

module.exports = router;
