const { Contact } = require("../../models/mongoosSchemas");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, `Not found`);
  }

  res.status(200);
  res.json({ code: 200, message: "Success", data: contact });
};

module.exports = { updateContactById: ctrlWrapper(updateContactById) };
