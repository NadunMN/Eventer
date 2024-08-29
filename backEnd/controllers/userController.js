const userModel = require("../models/userModel");

// Get all user data
const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
}
};

// Get user data by id
const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await userModel.findById(id);
        res.status(200).json(user)
    } catch(err){
        res.status(500).json({ message: "Error fetching events", err });
        
    }
};

module.exports ={
    getAllUser,
    getUser
}