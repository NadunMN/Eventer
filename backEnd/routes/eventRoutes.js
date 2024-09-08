const express = require("express");
const router = express.Router();
const {
  getEvents,
  searchEvents,
  createEvent,
  getOneEvent,
  createEventWithImage,
  getEventImage,
  getEventById,
  deleteEvent,
  editEvent,
  getCategory,
} = require("../controllers/eventController");
const multer = require("multer");
const upload = require("../middleware/uploadMiddleware.js");

const requireAuth = require("../middleware/requireAuth");

// Require auth for all routes
// router.use(requireAuth);

router.get("/getEvent", getEvents);
router.get("/searchEvents", searchEvents);
// router.post("/createEvent", createEvent);
// router.get('/getOne', getOneEvent)
router.get("/getEvent/:id", getOneEvent);
router.get("/getCategory", getCategory);
router.post("/createEvent", requireAuth, upload, createEventWithImage);
router.get("/events/:id/image", getEventImage);

// router.get("/events/:id", getEventById);

router.get("/events/:id", getEventById);
router.delete("/delete/:id", requireAuth, deleteEvent);
router.put("/edit/:id", requireAuth, editEvent);

module.exports = router;
