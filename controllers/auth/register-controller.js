const { User } = require("../../models/mongoosSchemas");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");
const bcrypt = require("bcryptjs");
//const { fs } = require("fs");
//const path = require("path");
const gravatar = require("gravatar");

//const avatarPath = path.resolve("public", "avatars");
//console.log(avatarPath);

const register = async (req, res) => {
  // const { path: oldPath, filename } = req.file;
  // const newPath = path.join(avatarPath, filename);

  // console.log(oldPath);
  // console.log(filename);
  // console.log(newPath);

  // await fs.rename(oldPath, newPath);

  //const { filename } = req.file;
  //const avatar = path.join("avatars", filename);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, {
    protocol: "http",
    d: "mp",
    s: "200",
  });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
