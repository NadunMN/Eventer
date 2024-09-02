// const mongoose = require('mongoose');
const Student = require('../models/regEventModel');


//Registered Event count
const countRegisteredEvent = async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.status(200).json({ countRegisteredEvent: count });
    } catch (err) {
        res.status(500).json({ message: "Error occurred", error: err.message });
    }
};

//Created event Count
const countCreatedEvent = async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.status(200).json({ countCreatedEvent: count });
    } catch (err) {
        res.status(500).json({ message: "Error occurred", error: err.message });
    }
};


//Favorite Event count
const countFavoriteEvent = async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.status(200).json({ countFavoriteEvent: count });
    } catch (err) {
        res.status(500).json({ message: "Error occurred", error: err.message });
    }
};


//Registered Event
const getRegisteredEvents = async (req, res) => {
    try {
      const events = await Student.find({"registered": true});
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events", error });
    }
  };

//Favorite Event
const getFavoriteEvents = async (req, res) => {
    try {
      const events = await Student.find({"favorite": true});
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events", error });
    }
  };

  


module.exports={
    countRegisteredEvent,
    countCreatedEvent,
    countFavoriteEvent,
    getRegisteredEvents,
    getFavoriteEvents,
};
