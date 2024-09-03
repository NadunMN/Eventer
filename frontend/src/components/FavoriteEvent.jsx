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

export default function FavoriteEvent() {

    const [events, setEvents] = useState([]);

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
          <div className="event-card" key={event._id}>
            <img src={event.imageUrl} alt={event.title} className="event-image" />
            <div className="event-details">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No Favorite events found.</p>
      )}
    </div> 
    
    </>
  );
}
