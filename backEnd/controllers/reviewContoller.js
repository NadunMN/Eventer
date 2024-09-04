const reviewModel = require("../models/reviewModel");

const getReviews = async (req, res) => {
  try {
    const review = await reviewModel.find({});
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error fetching review", error });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewModel.findById(id);
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: "Error fetching review", err });
  }
};
const getReviewByEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const review = await reviewModel.find({ event_id });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: "Error fetching review", err });
  }
};

const addReview = async (req, res) => {
  const { user_id, event_id, review, rating } = req.body;
  try {
    const addReview = new reviewModel({
      user_id,
      event_id,
      review,
      rating,
    });
    const result = await addReview.save();
    res.status(201).json({ message: "Add review successfully", addReview });
  } catch (error) {
    res.status(500).json({ message: "Server erros", error });
  }
};

const editReview = async (req, res) => {
  try {
    const result = await reviewModel.findOneAndUpdate(
      req.body.user_id,
      req.body,
      {
        new: true,
      }
    );

    if (!result) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Update riview successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getReviewById,
  getReviews,
  addReview,
  editReview,
  getReviewByEvent,
};
