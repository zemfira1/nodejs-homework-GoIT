const { Contact } = require("../../models/mongoosSchemas");
const { ctrlWrapper } = require("../../decorators");

const getContactsList = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const list = await Contact.find({ owner }, "-__v", {
    skip,
    limit,
  }).populate("owner", "email");

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    quantity: list.length,
    data: list,
  });
};

module.exports = { getContactsList: ctrlWrapper(getContactsList) };
