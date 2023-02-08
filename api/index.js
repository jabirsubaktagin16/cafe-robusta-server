const express = require("express");

const route = express.Router();
const config = require("./config");
const user = require("./user");
const food = require("./food");

route.use(user.config.ENDPOINT, user.route);
route.use(food.config.ENDPOINT, food.route);

module.exports = {
  config,
  route,
  user,
};
