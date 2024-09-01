const express = require('express')
const router = express.Router()
const { getEvents, searchEvents, createEvent, getOneEvent } = require("../controllers/eventController")

router.get('/getEvent', getEvents)
router.get('/searchEvents', searchEvents)
router.post('/createEvent', createEvent)
// router.get('/getOne', getOneEvent)
router.get('/getEvent/:id', getOneEvent)

module.exports = router