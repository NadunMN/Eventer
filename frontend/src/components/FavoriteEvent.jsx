import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FavoriteEvent() {
  const [events, setEvents] = useState([]);
  console.log(events);

  // get registered all Events
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getFavoriteEvents")
      .then((response) => {
        console.log(response.data);

        setEvents(response.data);
      })
      .catch((error) => {
        console.error("there was an error fetching ta data! ", error);
      });
  }, []);

  return (
    <>

      <div className="event-list">

        {events.length > 0 ? (
          events.map((event) => (
            <div>
              <Card sx={{ maxWidth: 345, bgcolor:'blue' }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={event.imageUrl}
                  title={event.title} 
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {event.description}
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
            </div>

          ))
        ) : (
          <p>No Favorite events found.</p>
        )}
      </div>
    </>
  );
}
