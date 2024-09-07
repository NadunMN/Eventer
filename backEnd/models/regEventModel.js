const mongoose = require('mongoose');

// Define a schema for your collection
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    student_id: {
        type: Number,
        required: true,
    },
    courses_enrolled: {
        type: [String],
        required: true,
    },

    registered: {
        type: Boolean,
        required: false,
    }
    // Add other fields as needed
});

// Create a model based on the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
