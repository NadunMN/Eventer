const mongoose = require("mongoose");

// Define the event schema
const EventSchema = new mongoose.Schema({
  title: {type: String, requireed: true},
  date: String,
  location: String,
  description: String,
  image: String,
});

const EventS = new mongoose.Schema({
  title: {type: String, required: true},
  start_date: {type: String, required: true},
  start_time: {type: String, required: true},
  end_date: {type: String},
  end_time: {type: String},
  description: {type: String},
  venue: {type: String, required: true},
  capacity: {type: Number},
  participants: {type: String},
  image: {type: String, required: true},
})

// // Create the event model
const EventModel = mongoose.model("event", EventSchema);

module.exports = EventModel;
