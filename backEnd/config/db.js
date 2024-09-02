const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/event");
        console.log("MongoDB connected!")   
    } catch (error) {
        console.log("MongoDB connection error: ", error)
        process.exit(1);
    }
}


module.exports = connectDB;