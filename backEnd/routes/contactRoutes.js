const express = require("express");
const router = express.Router();
const {addContact, getContacts} = require("../controllers/contactController");

router.post("/addContact", addContact);
router.get("/getContacts", getContacts);

module.exports = router;