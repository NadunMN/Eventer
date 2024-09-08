import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
export default function MediaCard() {
  const [events, setEvents] = useState([]);

  // Convert binary data to base64
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
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const token = user.token;

      // Fetch events
      axios
        .get("http://localhost:5000/api/event/getEvent", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const eventsData = res.data;

          const formattedData = eventsData.map((event) => {
            const formattedEvent = {
              title: event.title,
              description: event.description,
              participants: event.participants.length,
            };

            if (event.cover_image) {
              const base64Image = convertBinaryToBase64(
                new Uint8Array(event.cover_image.data),
                event.cover_image.contentType
              );
              formattedEvent.cover_image = base64Image;
            }

            return formattedEvent;
          });

          setEvents(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    } else {
      console.error("No user token found.");
    }
  }, []);
  // console.log("events", events);

  events.sort((a, b) => b.participants - a.participants);
  const topEvents = events.slice(0, 4);
  // console.log(topEvents);

  return (
    <>
      {topEvents.map((event, index) => (
        <Card
          key={index}
          sx={{
            width: 345, // Fixed width
            height: 400, // Fixed height
            marginBottom: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            sx={{ height: 140 }}
            image={event.cover_image}
            title={event.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {event.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Participants: {event.participants}
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ color: "#311b92" }} size="small">
              Share
            </Button>
            <Button size="small" sx={{ color: "#311b92" }}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
