const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("./contactSchemas.js");

const { userRegisterSchema, userLoginSchema } = require("./userSchema.js");

module.exports = {
  contactAddSchema,
  contactUpdateFavoriteSchema,
  userRegisterSchema,
  userLoginSchema,
};
