const { ctrlWrapper } = require("../../decorators");
const { User } = require("../../models/mongoosSchemas");
const { HttpError } = require("../../helpers");

const avatars = async (req, res) => {
  console.log(req.file);
  console.log(req.user);
  const { file, user } = req;

  if (!user) {
    throw HttpError(401);
  }

  if (!file) {
    throw HttpError(400, "File missing");
  }

  await User.findByIdAndUpdate(req.user._id, { avatarURL: file.filename });

  res.status(200).json({
    avatarURL: file.filename,
  });
};

module.exports = { avatars: ctrlWrapper(avatars) };
