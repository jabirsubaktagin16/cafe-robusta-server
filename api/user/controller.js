const User = require("./user");
const jwt = require("jsonwebtoken");

const jwtGenerate = (body) => {
  const email = body.email;
  const user = User.findOne({ email: email });
  if (user) {
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return { accessToken: token };
  }
  return res.status(403).send({ accessToken: "" });
};

const createUser = (body) => {
  const user = new User(body);
  return user.save();
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
        contactNo: user.contactNo,
      },
    }
  );
};

const findAllUsers = () => User.find().toArray();

const checkAdmin = (body) => {
  const email = body.email;
  const user = User.findOne({ email: email });
  const isAdmin = user?.role === "admin";
  return isAdmin;
};

module.exports = {
  jwtGenerate,
  createUser,
  findUserByEmail,
  updateUser,
  findAllUsers,
  checkAdmin,
};
