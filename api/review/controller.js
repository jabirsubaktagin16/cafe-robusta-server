const Review = require("./review");

const getAllReviews = () => Review.find();

const createReview = (body) => {
  const review = new Review(body);
  return review.save();
};

const findReviewByEmail = (email) => Review.find({ email: email });

module.exports = {
  getAllReviews,
  createReview,
  findReviewByEmail,
};
