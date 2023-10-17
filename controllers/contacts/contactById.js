const {Contact} = require("../../models/mongoosSchemas");
const HttpError = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const getContactById = async (req, res) => {
  const { id } = req.params;
  //const contactBId = await Contact.findOne({ _id: id });
  const contactBId = await Contact.findById(id);

  if (!contactBId) {
    throw HttpError(404, `Not found`);
  }

  res.json(contactBId);
};

module.exports = { getContactById: ctrlWrapper(getContactById) };
