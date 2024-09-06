const express = require("express");
const router = express.Router();
const {
  getReviewById,
  getReviews,
  editReview,
  addReview,
  getReviewByEvent,
  deleteReview,
  updateReview,
} = require("../controllers/reviewContoller");

router.get("/getReview/:event_id", getReviewByEvent);
router.get("/", getReviews);
router.put("/edit", editReview);
router.post("/addReview", addReview);
router.delete("/deleteReview/:id", deleteReview);
router.put("/updateReview/:id", updateReview);

module.exports = router;
