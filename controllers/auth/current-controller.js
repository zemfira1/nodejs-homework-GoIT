const { ctrlWrapper } = require("../../decorators");

const current = async (req, res) => {
  const { email, subscription } = req.body;

  res.status(200).json({
    email,
    subscription,
  });
};

module.exports = {
  current: ctrlWrapper(current),
};
