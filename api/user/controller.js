const User = require("./user");
const jwt = require("jsonwebtoken");

const userAuthorization = (body) => {
  const options = { upsert: true, new: true };
  const updateDoc = {
    $set: body,
  };
  const result = User.findOneAndUpdate(
    { email: body.email },
    updateDoc,
    options
  );
  const token = jwt.sign(
    { email: body.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return { result, token };
};

const findUserByEmail = (email) => User.find({ email: email });

const updateUser = (body) => {
  const user = new User(body);
  return User.updateOne(
    { _id: body._id },
    {
      $set: {
        email: user.email,
        location: user.location,
        occupation: user.occupation,
        img: user.img,
        name: user.name,
      },
    }
  );
};

const findAllUsers = () => User.find().toArray();

module.exports = {
  userAuthorization,
  findUserByEmail,
  updateUser,
  findAllUsers,
};
