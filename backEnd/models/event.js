const mongoose = require("mongoose");

// // Define the event schema
const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  location: String,
  description: String,
  image: String,
});

// // Create the event model
const EventModel = mongoose.model("event", EventSchema);

module.exports = EventModel;
