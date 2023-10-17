const { Contact } = require("../../models/mongoosSchemas");
const HttpError = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const updateContactById = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, `Not found`);
  }

  res.json(contact);
};

module.exports = { updateContactById: ctrlWrapper(updateContactById) };
