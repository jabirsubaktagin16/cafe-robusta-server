const express = require("express");

const route = express.Router();
const config = require("./config");
const user = require("./user");
const food = require("./food");
const review = require("./review");

route.use(user.config.ENDPOINT, user.route);
route.use(food.config.ENDPOINT, food.route);
route.use(review.config.ENDPOINT, review.route);

module.exports = {
  config,
  route,
  user,
  review,
};
