const express = require("express");
const router = express.Router();
const {countRegisteredEvent, countCreatedEvent, countFavoriteEvent} = require("../controllers/userProfileController")

router.get('/countRegisteredEvent', countRegisteredEvent);
router.get('/countCreatedEvent', countCreatedEvent);
router.get('/countFavoriteEvent', countFavoriteEvent);

module.exports = router;