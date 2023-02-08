const express = require("express");
const cors = require("cors");
const route = express();
const FoodController = require("./controller");

//Middleware
route.use(cors());
route.use(express.json());

/* route.get("/", auth, async (req, res) => {
  try {
    const a = await FoodController.getMovieByUserID(req.body.user_id);
    res.status(200).send(a);
  } catch (e) {
    res.status(400).send(e);
  }
}); */

route.get("/category/:categoryName", async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const data = await FoodController.getFoodByCategory(categoryName);
    res.status(200).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

route.post("/", async (req, res) => {
  try {
    const data = await FoodController.createFood(req.body);
    res.status(201).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err });
  }
});

module.exports = route;
