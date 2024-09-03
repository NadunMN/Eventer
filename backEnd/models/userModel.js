const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  username: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String },
  password: { type: String, required: true },
  created_at: { type: String, required: true },
  updated_at: { type: String },
  profile_picture_url: { type: String },
});

// // Create the user model
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
