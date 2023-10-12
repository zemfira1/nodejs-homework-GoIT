const Contact = require("../../models/Contact");
const HttpError = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json({ message: "contact deleted" });
};

module.exports = { removeContactById: ctrlWrapper(removeContactById) };
