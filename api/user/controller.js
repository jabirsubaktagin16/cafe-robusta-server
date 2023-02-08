const User = require("./user");
const jwt = require("jsonwebtoken");

const userAuthorization = async (body) => {
  const user = new User(body);
  const filter = { email: body.email };
  const options = { upsert: true };
  const updateDoc = {
    $set: user,
  };
  const result = await User.findOneAndUpdate(filter, options, updateDoc);
  const token = jwt.sign(
    { email: body.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return { result, token };
};

module.exports = { userAuthorization };
