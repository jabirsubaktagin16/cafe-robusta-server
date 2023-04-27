const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
