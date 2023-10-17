const {Contact} = require("../../models/mongoosSchemas");
const { ctrlWrapper } = require("../../decorators");

const getContactsList = async (req, res) => {
  const list = await Contact.find({}, "-__v");
  res.json(list);
};

module.exports = { getContactsList: ctrlWrapper(getContactsList) };
