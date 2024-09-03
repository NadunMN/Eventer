const mongoose = require("mongoose");

// Define the event schema
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start_date: { type: String, required: true },
  start_time: { type: String, required: true },
  end_date: { type: String },
  end_time: { type: String },
  description: { type: String },
  venue: { type: String, required: true },
  capacity: { type: Number },
  participants: { type: [String] }, 
  cover_image: { type: Buffer}, // If image is not always required, remove `required: true`
});

// Create the event model
const EventModel = mongoose.model("events", EventSchema);

module.exports = EventModel;
