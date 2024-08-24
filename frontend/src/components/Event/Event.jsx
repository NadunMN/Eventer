/* eslint-disable no-undef */
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, CardMedia } from '@mui/material';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SearchForm from './SearchForm';

const Event = () => {
  
  const [listOfEvent, setListOfEvent] = useState([])
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  //get all events
  useEffect (() => {
      axios.get("http://localhost:5000/api/getEvent")
      .then((response) => {
          setListOfEvent(response.data)
      } )
      .catch(error => {
        console.error("there was an error fetching ta data! ", error)
      })
  }, [])

  
  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };
  


  return (
    <>
      {/* <GetEvent /> */}

      <Container>
        <SearchForm  setListOfEvents={setListOfEvent}/>

        <Grid container spacing={3}>
          {listOfEvent.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card>
                <CardMedia 
                  component="img"
                  height="140"
                  image={event.image}
                  alt={event.image}
                />
                <CardContent>
                  <Typography variant="h5">{event.title}</Typography>
                  <Typography variant="subtitle1">{event.date}</Typography>
                  <Typography variant="body2">{event.location}</Typography>
                  <Typography variant="body2">{event.description}</Typography>
                  <Button variant="contained" color="primary" onClick={() => handleOpen(event)}>More Info</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedEvent?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Date: {selectedEvent?.date}</Typography>
          <Typography variant="h6">Location: {selectedEvent?.location}</Typography>
          <Typography variant="body1">{selectedEvent?.description}</Typography>
          <Typography variant= "h6">buy</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Event;
