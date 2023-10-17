const { User } = require("../../models/mongoosSchemas");
//const HttpError = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const register = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    email: user.email,
    //subscription: "starter",
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
