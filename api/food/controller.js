const Food = require("./food");

const getFoodByCategory = (categoryName) =>
  Food.find({ category: categoryName });

const deleteFood = (id) => Food.deleteOne({ _id: id });

const updateFood = (body) => {
  const food = new Food(body);
  return Food.updateOne(
    { _id: body._id },
    {
      $set: {
        title: food.title,
        category: food.category,
        subCategory: food.subCategory,
        imageURL: food.imageURL,
        price: food.price,
        details: food.details,
      },
    }
  );
};

const createFood = (body) => {
  const food = new Food(body);
  return food.save();
};

module.exports = {
  getFoodByCategory,
  deleteFood,
  updateFood,
  createFood,
};
