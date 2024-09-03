const express = require('express')
const router = express.Router()
const { getEvents, searchEvents, createEvent, getOneEvent, createEventWithImage, getEventImage, getEventById} = require("../controllers/eventController")
const multer = require('multer');
const upload = require ('../middleware/uploadMiddleware.js')

// const upload = multer();

router.get('/getEvent', getEvents)
router.get('/searchEvents', searchEvents)
router.post('/createEvent', createEvent)
// router.get('/getOne', getOneEvent)
router.get('/getEvent/:id', getOneEvent)
router.post('/events', upload, createEventWithImage);
router.get('/events/:id/image', getEventImage);
router.get('/events/:id', getEventById);


module.exports = router