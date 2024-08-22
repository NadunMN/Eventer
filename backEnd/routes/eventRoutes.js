const express = require('express')

const { getEvents, searchEvents, createEvent } = require("../controllers/eventController")
const router = express.Router()

router.get('/getEvent', getEvents)
router.post('/searchEvents', searchEvents)
router.post('/createEvent', createEvent)

module.exports = router