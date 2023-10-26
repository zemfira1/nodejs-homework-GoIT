const { User } = require("../../models/mongoosSchemas");
const { ctrlWrapper } = require("../../decorators");

const logout = async (req, res) => {
  console.log(req.user._id);
  console.log(req.user.token);
  await User.findByIdAndUpdate(req.user._id, { token: null });

  res.status(204).json({
    message: "Success",
  });
};

module.exports = {
  logout: ctrlWrapper(logout),
};
