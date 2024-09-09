import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { jwtDecode } from "jwt-decode";

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
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const user_id = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
      if (user_id) {
          const jsonString = JSON.stringify(user_id);
          const jwtToken = jwtDecode(jsonString);
          // console.log(jwtToken);
          setUserId(jwtToken._id); // This will trigger the second useEffect
      }
  }, [user_id]);

  

  
  useEffect(() => {
    if (userId) {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/getUserById/${userId}`);
                let userData = response.data;
                setUser(userData);    
            } catch (error) {
                console.error("Failed to fetch the user:", error);
                setError("Failed to fetch the user");
                
            }
        };

        fetchUser();
    }
}, [userId]);





useEffect(() => {
  if (Array.isArray(user.registered_events) && user.registered_events.length > 0) {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await Promise.all(
          user.registered_events.map(async (id) => {
            // Make a separate GET request for each ID
            const response = await axios.get(`http://localhost:5000/api/event/getEvent/${id}`);
            let eventData = response.data;
            
            // Convert binary data to base64 if there is a cover image
            if (eventData.cover_image) {
              const base64Image = convertBinaryToBase64(
                new Uint8Array(eventData.cover_image.data),
                eventData.cover_image.contentType
              );
              eventData.cover_image = base64Image;
            }
            
            return eventData;
          })
        );
        
        setEvents(fetchedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch the events:", error);
        setError("Failed to fetch the events");
        setLoading(false);
      }
    };
    
    fetchEvents();
  } else {
    // Handle the case where there are no favorite events
    setEvents([]);
    setLoading(false);
  }
}, [user.registered_events]);



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
        <p>No Registered events found.</p>
      )}
    </div>
  );
}
