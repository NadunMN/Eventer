import * as React from 'react';
import Box from '@mui/material/Box';
import TemporaryDrawer from './Drawer'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import MediaCard from './Card'
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RegisteredEvent() {

    const [events, setEvents] = useState([]);
    console.log(events);

        // get registered all Events
        useEffect(() => {
            axios
              .get("http://localhost:5000/api/getRegisteredEvents")
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
       <div>

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
        <p>No registered events found.</p>
      )}
    </div> 
    
    </>
  );
}
