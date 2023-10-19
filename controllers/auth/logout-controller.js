const { User } = require("../../models/mongoosSchemas");
const { ctrlWrapper } = require("../../decorators");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndDelete(req.user._id, { token: "" });

  res.status(204);
};

module.exports = {
  logout: ctrlWrapper(logout),
};
