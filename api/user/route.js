const express = require("express");
const cors = require("cors");
const route = express.Router({ mergeParams: true });
const UserController = require("./controller");
const { verifyJWT, verifyAdmin } = require("../middleware/auth");

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

route.get("/:email", verifyJWT, async (req, res) => {
  try {
    const email = req.params.email;
    const result = await UserController.findUserByEmail(email);
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

route.patch("/:id", verifyJWT, async (req, res) => {
  try {
    const data = await UserController.updateUser(req.body);
    res.status(200).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

route.get("/", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const users = await UserController.findAllUsers();
    res.status(200).send({ response: users });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

module.exports = route;
