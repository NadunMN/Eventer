// const mongoose = require('mongoose');
const Student = require('../models/regEventModel');
const EventModel = require('../models/eventModel');
const userModel = require('../models/userModel');
const multer = require('multer');
const upload = multer();


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




  //get one UserDetatis 
  const getUserOne = async (req, res) => {
    try {
      const { id } = req.params; //get the title from the query prameters
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid event ID !" });
      }
      const user = await userModel.findById(id);
      if (user) {
        res.status(200).json(user); //send the user data if found
      } else {
        res.status(404).json({ message: "user not found!" });
      }
    } catch (error) {
      res.status(500).json({ message: "cannot Request !", error });
    }
  };

  


module.exports={
    countRegisteredEvent,
    countCreatedEvent,
    countFavoriteEvent,
    getUserOne,
};
