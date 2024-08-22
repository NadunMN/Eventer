const Event = require('../models/eventModel')

// api to get Events
const getEvents = async (req, res) => {
    try {
      const events = await EventModel.find({});
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events", error });
    }
  }

//api for search events
const searchEvents = async(req,res) => {
    try {
      const searchString = req.query.title//get the title from the query prameters
      const events = await EventModel.find({title: new RegExp(searchString, 'i')})
      const allevents = await EventModel.find({});
  
      if (events.length > 0){
        res.status(200).json(events)//send the user data if found
      } else if (events.length == 0) {
        res.status(200).json(allevents)
      } else {
        res.status(404).json({ message: "Event no found!"})
      }
    } catch (error) {
      res.status(500).json({ message: " Error searching event", error})
    }
  }

const createEvent = async (req, res) => {
    const event = new Event(req.body);
    try {
        const savedEvent = await event.save()
        res.status(201).json(savedEvent)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

  module.exports = {
    getEvents,
    searchEvents,
    createEvent,
  }