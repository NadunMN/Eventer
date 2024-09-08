const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  addContact,
  getContacts,
  deleteReview,
  updateFeedback,
} = require("../controllers/contactController");

router.post("/addContact", addContact);
router.get("/getContacts", getContacts);
router.delete("/deleteContact/:id", requireAuth, deleteReview);
router.put("/updateContact/:id", updateFeedback);

module.exports = router;
