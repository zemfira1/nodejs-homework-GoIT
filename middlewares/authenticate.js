const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const jwt = require("jsonwebtoken");
const { User } = require("../models/mongoosSchemas");
const path = require("path");
const configPath = path.join(__dirname, "..", ".env");
require("dotenv").config({ path: configPath });

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    throw HttpError(401);
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = { authenticate: ctrlWrapper(authenticate) };
