require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongoDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vbo9u7n.mongodb.net/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((res) => console.log("MongoDB connected"))
    .catch((err) => {
      console.log("Error in connection ", err);
    });
};

module.exports = { connectToMongoDB };
