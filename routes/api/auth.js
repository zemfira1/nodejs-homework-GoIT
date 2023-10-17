const express = require("express");
const register = require("../../controllers/auth");
const { isEmptyBody } = require("../../middlewares");
const { validateBody } = require("../../decorators");
const {
  userRegisterSchema,
  //userLoginSchema,
} = require("../../models/joiSchemas/userSchema");

const userRegisterValidate = validateBody(userRegisterSchema);
//const userLoginValidate = validateBody(userLoginSchema);

const authRouter = express.Router();

authRouter.post("./register", isEmptyBody, userRegisterValidate, register);
//authRouter.post("./login", isEmptyBody, userLoginValidate, signup);

module.exports = authRouter;
