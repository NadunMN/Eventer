const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getReviewById,
  getReviews,
  editReview,
  addReview,
  getReviewByEvent,
  deleteReview,
  updateReview,
} = require("../controllers/reviewContoller");

router.get("/getReview/:event_id", requireAuth, getReviewByEvent);
router.get("/", requireAuth, getReviews);
router.put("/edit", requireAuth, editReview);
router.post("/addReview", requireAuth, addReview);
router.delete("/deleteReview/:id", requireAuth, deleteReview);
router.put("/updateReview/:id", requireAuth, updateReview);

module.exports = router;
