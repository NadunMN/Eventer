const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: { type: String, require: true },
  user_id: { type: String, require: true },
  event_id: { type: String, require: true },
  rating: { type: Number, require: true },
});

const reviewModel = mongoose.model("review", reviewSchema);
module.exports = reviewModel;
