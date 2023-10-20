const { Contact } = require("../../models/mongoosSchemas");
const { ctrlWrapper } = require("../../decorators");

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201);
  res.json({ code: 201, message: "Success", data: newContact,  });
};

module.exports = { addNewContact: ctrlWrapper(addNewContact) };
