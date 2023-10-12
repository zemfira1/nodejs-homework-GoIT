const Contact = require("../../models/Contact");
const HttpError = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, `Not found`);
  }

  res.json(contact);
};

module.exports = { updateStatusContact: ctrlWrapper(updateStatusContact) };
