const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const jwt = require("jsonwebtoken");
const { User } = require("../models/mongoosSchemas");
//const { JWT_SECRET } = process.env;
const JWT_SECRET =
  "7GGi0Zz8T7dcLtKXIpa3RCM6Xjfe0hSA4HOeKoG4fF5uk1zD4yhjyHa2hdPZcqm5";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
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
