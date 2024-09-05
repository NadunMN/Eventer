const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

//create jw token
const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: "1d" });
};

// Get all user data
const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get user data by id
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", err });
  }
};

const signup = async (req, res) => {
  const { first_name, last_name, role, email, username, password, created_at } =
    req.body;
  console.log(req.body);

  try {
    // Check if the user already exist
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Email is already exists" });
    }
    // Check if the email is valid
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, salt);
    // Create new User
    user = new userModel({
      first_name,
      last_name,
      email,
      role,
      username,
      password: encryptPassword,
      created_at,
    });
    // signup user
    const signUser = await user.save();

    // Create token
    const token = createToken(signUser._id, signUser.role);

    res.status(201).json({ msg: "User registered successfully", token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if email or password is empty
    if (!email || !password) {
      return res.status(400).send("All fields must be filled");
    }

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send("Invalid email or password");
    }

    const token = createToken(user._id, user.role);
    return res.status(200).json({ message: "Login successfully", token });
  } catch {
    return res.status(500).send("Server error");
  }
};






const editUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const result = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Update user successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await userModel.findByIdAndDelete(id);

    if (!result) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "user delete successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


module.exports = {
  getAllUser,
  getUser,
  signup,
  login,
  editUser,
  deleteUser,
};
