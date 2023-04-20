const express = require("express");
const cors = require("cors");
const route = express.Router({ mergeParams: true });
const ReviewController = require("./controller");
const { verifyJWT } = require("../middleware/auth");

//Middleware
route.use(cors());
route.use(express.json());

/* Get All Reviews */
route.get("/all-reviews", async (req, res) => {
  try {
    const reviews = await ReviewController.getAllReviews();
    res.status(200).send({ response: reviews });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

/* Post a New Review */
route.post("/new-review", verifyJWT, async (req, res) => {
  try {
    const data = await ReviewController.createReview(req.body);
    res.status(201).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err });
  }
});

/* Get Reviews of Specific E-Mail */
route.get("/all-reviews/:email", verifyJWT, async (req, res) => {
  try {
    const email = req.params.email;
    const data = await ReviewController.findReviewByEmail(email);
    res.status(200).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

module.exports = route;
