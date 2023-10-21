const { Contact } = require("../../models/mongoosSchemas");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const contactBId = await Contact.findOne({ _id: id, owner });
  //const contactBId = await Contact.findById({ _id: id, owner });

  if (!contactBId) {
    throw HttpError(404, `Not found`);
  }

  res.status(200);
  res.json({ code: 200, message: "Success", data: contactBId });
};

module.exports = { getContactById: ctrlWrapper(getContactById) };
