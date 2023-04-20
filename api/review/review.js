const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
