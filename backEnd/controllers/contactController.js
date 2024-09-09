const ContactModel = require("../models/contactModel");

const addContact = async (req, res) => {
  const { name, email, message, processed } = req.body;
  try {
    contact = new ContactModel({
      name,
      email,
      message,
      processed,
    });
    const savedContact = await contact.save();

    res
      .status(201)
      .json({ message: "Contact added successfully", savedContact });
  } catch (err) {
    return res.status(401).send("Contact failed");
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find({});
    res.status(200).send(contacts);
  } catch (error) {
    return res.status(401).send("contact fetching failed");
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ContactModel.findByIdAndDelete(id);

    if (!result) {
      res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback delete successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ContactModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Update Feedback successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addContact,
  getContacts,
  deleteReview,
  updateFeedback,
};
