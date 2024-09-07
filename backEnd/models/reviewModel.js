const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: { type: String, required: true },
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  event_id: { type: String, required: true },
  event_title: { type: String, required: true },
  rating: { type: Number, required: true },
});

const reviewModel = mongoose.model("review", reviewSchema);
module.exports = reviewModel;
