import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Function to convert binary data to base64
const convertBinaryToBase64 = (binaryData, contentType) => {
  if (binaryData && binaryData instanceof Uint8Array) {
    const binaryString = Array.from(binaryData)
      .map((byte) => String.fromCharCode(byte))
      .join("");
    return `data:${contentType};base64,${btoa(binaryString)}`;
  } else {
    console.error("Invalid binary data provided:", binaryData);
    return null;
  }
};

export default function FavoriteEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/event/getEvent');

        let eventData = response.data;

 
        // Ensure eventData is an array
        if (!Array.isArray(eventData)) {
          eventData = [eventData];
        }

        // Process the event data
        const processedEvents = eventData.map((event) => {
          if (event.cover_image) {
            const base64Image = convertBinaryToBase64(
              new Uint8Array(event.cover_image.data),
              event.cover_image.contentType
            );
            event.cover_image = base64Image;
          }
          return event;
        });

        setEvents(processedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch the event:", error);
        setError("Failed to fetch the event");
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  return (
    <div className="card-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : events.length > 0 ? (
        events.map((event, index) => (
          <div key={index}>
            <Card sx={{ width: 345, height: 450, margin: "1rem auto", position: 'relative' }}>
              <CardMedia
                sx={{ height: 250 }}
                image={event.cover_image || "https://via.placeholder.com/345x140"}
                title={event.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description.slice(0, 200)}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', position: 'absolute', bottom: 0 }}>
                <Button sx={{ color: "#311b92" }} size="small">
                  Share
                </Button>
                <Button size="small" sx={{ color: "#311b92" }}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </div>
        ))
      ) : (
        <p>No Favorite events found.</p>
      )}
    </div>
  );
}
