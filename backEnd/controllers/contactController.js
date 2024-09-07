const ContactModel = require("../models/contactModel");

const addContact = async (req, res) => {

    const { name, email, message } = req.body;
    try {
        contact = new ContactModel({
            name,
            email, 
            message
          });
          const savedContact = await contact.save();

          res.status(201).json(savedContact).send("Contact added successfully");
    } catch (err){
        return res.status(401).send("Contact failed");
    }
}

const getContacts = async (req, res) => {
    try{
        const contacts = await ContactModel.find({});
        res.status(200).send(contacts);
    } catch(error){
        return res.status(401).send("contact fetching failed");
    }
}

module.exports ={
    addContact, getContacts
}