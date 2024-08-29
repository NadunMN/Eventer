const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

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

const register = async (req, res) => {
    const { fName, lName, role, email, username, password } = req.body;
    console.log(req.body);
    

    try {
        // Chrck if the user already exist
        let user = await userModel.findOne( { email });
        if (user){
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const  encryptPassword = await bcrypt.hash(password, salt);
        // Create new User
        user = new userModel({
            fName,
            lName,
            email,
            role,
            username,
            password: encryptPassword
        });

        await user.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err){
        console.log(err.message);
        res.status(500).send("Server error");
        
    }
};

module.exports ={
    getAllUser,
    getUser,
    register
}