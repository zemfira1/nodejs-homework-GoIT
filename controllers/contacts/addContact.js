const Contact = require("../../models/Contact");
const { ctrlWrapper } = require("../../decorators");

const addNewContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

module.exports = { addNewContact: ctrlWrapper(addNewContact) };
