const express = require("express");
const router = express.Router();
const {
  getReviewById,
  getReviews,
  editReview,
  addReview,
  getReviewByEvent,
} = require("../controllers/reviewContoller");

router.get("/getReview/:event_id", getReviewByEvent);
router.get("/", getReviews);
router.put("/edit", editReview);
router.post("/addReview", addReview);

module.exports = router;
