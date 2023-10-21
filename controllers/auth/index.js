const { register } = require("./register-controller");
const { login } = require("./login-controller");
const { logout } = require("./logout-controller");
const { current } = require("./current-controller");

module.exports = { register, login, logout, current };
