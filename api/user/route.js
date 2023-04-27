const express = require("express");
const cors = require("cors");
const route = express.Router({ mergeParams: true });
const UserController = require("./controller");
const { verifyJWT, verifyAdmin } = require("../middleware/auth");

//Middleware
route.use(cors());
route.use(express.json());

/* Token Generate and Store User Email in Database */
route.get("/jwt/:email", async (req, res) => {
  try {
    const data = await UserController.jwtGenerate(req.params.email);
    res.status(200).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Post New User in the database */
route.post("/users", async (req, res) => {
  try {
    const data = await UserController.createUser(req.body);
    res.status(201).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err.message });
  }
});

/* Get User Information by Email */
route.get("/:email", verifyJWT, async (req, res) => {
  try {
    const email = req.params.email;
    const result = await UserController.findUserByEmail(email);
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Update User Information */
route.patch("/:id", verifyJWT, async (req, res) => {
  try {
    const data = await UserController.updateUser(req.body);
    res.status(200).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Get All User for Admin */
route.get("/", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const users = await UserController.findAllUsers();
    res.status(200).send({ response: users });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Checking if the user is Admin */
route.get("/admin/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const info = await UserController.findUserByEmail(email);
    const adminCheck = info[0]?.role === "admin";
    res.status(200).send({ admin: adminCheck });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

module.exports = route;
