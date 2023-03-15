const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
  },
  location: {
    type: String,
  },
  occupation: {
    type: String,
  },
  img: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
