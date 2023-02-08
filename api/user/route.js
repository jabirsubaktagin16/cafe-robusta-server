const express = require("express");
const cors = require("cors");
const route = express.Router({ mergeParams: true });
const UserController = require("./controller");

//Middleware
route.use(cors());
route.use(express.json());

// Token Generate and Store User Email in Database
route.put("/:email", async (req, res) => {
  try {
    const data = await UserController.userAuthorization(req.body);
    res.status(200).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

module.exports = route;
