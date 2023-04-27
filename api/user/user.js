const mongoose = require("mongoose");

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
    trim: true,
    lowercase: true,
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
  contactNo: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
