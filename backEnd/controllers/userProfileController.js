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




// Controller for fetching all user data
const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "user not found" });

    }else{
      res.status(200).json(user); //send the user data if found

    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update user profile
const updatedUserImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Update the user's cover_image with the new image buffer
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { cover_image: req.file.buffer },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user image" });
  }
};



module.exports={
    countRegisteredEvent,
    countCreatedEvent,
    countFavoriteEvent,
    getUserById,
    updateUser,
    updatedUserImage,
};
