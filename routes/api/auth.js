const express = require("express");
const {
  register,
  login,
  logout,
  current,
  avatars,
} = require("../../controllers/auth");
const { isEmptyBody, authenticate, upload } = require("../../middlewares");
const { validateBody } = require("../../decorators");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../../models/joiSchemas/userSchema");

const userRegisterValidate = validateBody(userRegisterSchema);
const userLoginValidate = validateBody(userLoginSchema);

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatarURL"),
  isEmptyBody,
  userRegisterValidate,
  register
);
authRouter.post("/login", isEmptyBody, userLoginValidate, login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, current);
authRouter.patch("/avatars", upload.single("avatarURL"), authenticate, avatars);

module.exports = authRouter;
