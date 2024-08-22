const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const eventRoutes = require("./routes/eventRoutes")
const EventModel = require("./models/eventModel");
const errorHadler = require("./middleware/errorHandler");
const router = require("./routes/eventRoutes");

//enviromental variable form .env
require('dotenv').config()

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
connectDB()

// Routes
app.use('/api', eventRoutes)

// Error handling
app.use(errorHadler)



// api to get Events
app.get("/getEvent", async (req, res) => {
  try {
    const events = await EventModel.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

//api for search events


app.get("/searchEvents", async(req,res) => {
  try {
    const searchString = req.query.title//get the title from the query prameters
    const events = await EventModel.find({title: new RegExp(searchString, 'i')})
    const allevents = await EventModel.find({});

    if (events.length > 0){
      res.status(200).json(events)//send the user data if found
    } else if (events.length == 0) {
      res.status(200).json(allevents)
    } else {
      res.status(404).json({ message: "Event no found!"})
    }
  } catch (error) {
    res.status(500).json({ message: " Error searching event", error})
  }
})

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running perfectly! Running on port ${PORT}`);
});
