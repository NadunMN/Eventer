const EventModel = require("../models/eventModel");

// api to get Events
const getEvents = async (req, res) => {
  try {
    const events = await EventModel.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

//api for search events
const searchEvents = async (req, res) => {
  try {
    const searchString = req.query.title; //get the title from the query prameters
    const events = await EventModel.find({
      title: new RegExp(searchString, "i"),
    });
    const allevents = await EventModel.find({});

    if (events.length > 0) {
      res.status(200).json(events); //send the user data if found
    } else if (events.length == 0) {
      res.status(200).json(allevents);
    } else {
      res.status(404).json({ message: "Event no found!" });
    }
  } catch (error) {
    res.status(500).json({ message: " Error searching event", error });
  }
};

const createEvent = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.start_time ||
      !req.body.start_date ||
      !req.body.end_time ||
      !req.body.end_date
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: name, start_time, start_date, end_time, end_date",
      });
    }
    const newEvent = {
      name: req.body.name,
      description: req.body.description,
      start_time: req.body.start_time,
      start_date: req.body.start_date,
      end_time: req.body.end_time,
      end_date: req.body.end_date,
      capacity: req.body.capacity,
    };

    const event = await EventModel.create(newEvent);
    return res.status(201).send(event);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getEvents,
  searchEvents,
  createEvent,
};
