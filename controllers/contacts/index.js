const { getContactsList } = require("./contactsList");
const { getContactById } = require("./contactById");
const { addNewContact } = require("./addContact");
const { removeContactById } = require("./deleteContact");
const { updateContactById } = require("./updateContact");
const { updateStatusContact } = require("./updateStatus");

module.exports = {
  getContactsList,
  getContactById,
  addNewContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
};
