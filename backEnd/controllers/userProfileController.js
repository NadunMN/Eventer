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


module.exports={
    countRegisteredEvent,
    countCreatedEvent,
    countFavoriteEvent,
};
