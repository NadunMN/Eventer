const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  role: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// // Create the user model
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
