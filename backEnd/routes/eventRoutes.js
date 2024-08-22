const express = require('express')
const router = express.Router()
const { getEvents, searchEvents, createEvent } = require("../controllers/eventController")

router.get('/getEvent', getEvents)
router.get('/searchEvents', searchEvents)
router.post('/createEvent', createEvent)

module.exports = router