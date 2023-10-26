const { ctrlWrapper } = require("../../decorators");
const { User } = require("../../models/mongoosSchemas");
const { HttpError } = require("../../helpers");
const Jimp = require("jimp");
const gravatar = require("gravatar");

const avatars = async (req, res) => {
  //console.log(req.file);
  //console.log(req.user);
  const { file, user } = req;

  if (!user) {
    throw HttpError(401);
  }

  if (!file) {
    throw HttpError(400, "File missing");
  }

  const image = await Jimp.read(file.path);
  image.resize(250, 250);
  const avatarURL = gravatar.url(user.email, {
    protocol: "http",
    d: "mp",
  });

  await User.findByIdAndUpdate(req.user._id, { avatarURL: avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

module.exports = { avatars: ctrlWrapper(avatars) };
