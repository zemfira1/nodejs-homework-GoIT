const { register } = require("./register-controller");
const { login } = require("./login-controller");
const { logout } = require("./logout-controller");
const { current } = require("./current-controller");
const { avatars } = require("./avatars-controller");
const { verify } = require("./verify-controller");
const { resendVerifyEmail } = require("./resendVerifyEmail-controller");

module.exports = {
  register,
  login,
  logout,
  current,
  avatars,
  verify,
  resendVerifyEmail,
};
