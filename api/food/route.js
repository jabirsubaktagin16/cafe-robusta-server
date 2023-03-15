const express = require("express");
const cors = require("cors");
const route = express();
const FoodController = require("./controller");
const { verifyJWT, verifyAdmin } = require("../middleware/auth");

//Middleware
route.use(cors());
route.use(express.json());

route.get("/manageMenu", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const result = await FoodController.getAllFoods();
    res.status(200).send({ response: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

route.get("/category/:categoryName", async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const data = await FoodController.getFoodByCategory(categoryName);
    res.status(200).send({ response: data });
  } catch (err) {
    res.status(400).send({ response: err.message });
  }
});

route.post("/", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const data = await FoodController.createFood(req.body);
    res.status(201).send({ response: data });
  } catch (err) {
    res.status(500).send({ response: err });
  }
});

module.exports = route;
