const mongoose = require('mongoose');
const Student = require('../models/student')

exports.addition = async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.status(200).json({ "addition": count });
    } catch (err) {
        res.status(500).json({ message: "Error occurred", error: err.message });
    }
};
