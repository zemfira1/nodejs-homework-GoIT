const { User } = require("../../models/mongoosSchemas");
const { HttpError, sendemail } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");
const path = require("path");
const configPath = path.join(__dirname, "..", "..", ".env");
require("dotenv").config({ path: configPath });

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendemail(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };
