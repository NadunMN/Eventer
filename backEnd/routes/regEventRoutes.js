const express = require("express");
const router = express.Router();
const regevent = require("../controllers/regevent")

router.get('/addition', regevent.addition);

module.exports = router;