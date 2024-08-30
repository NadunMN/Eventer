/* eslint-disable no-undef */
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CardMedia,
} from "@mui/material";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SearchForm from "./SearchForm";
import { red } from "@mui/material/colors";
import {eventData} from "./EventData"

const Event = () => {
  const [listOfEvent, setListOfEvent] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  //get all events
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getEvent")
      .then((response) => {
        setListOfEvent(response.data);
      })
      .catch((error) => {
        console.error("there was an error fetching ta data! ", error);
      });
  }, []);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const gridItemProps = {
    xs: 20,
    sm: 12,
    md: 8,
    lg: 4,
    sx: {
      mt: 1,
      pl: 8,
      display: "flex",
      flexDirection: "column",
      gutterBottom: 2,
    },
  };

  return (
    <>
      <SearchForm setListOfEvents={setListOfEvent} sx={{}} />

      <Container maxWidth="xl" fixed sx={{ mt: 5 }}>
        <Grid container spacing={2} columns={20}>
          {listOfEvent.map((event) => (
            <Grid item key={event.id} {...gridItemProps}>
              <Card
                sx={{
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f0f0",
                  borderRadius: 3,
                  boxShadow: 10,
                  gap: 2,
                  transition: "al 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={event.image}
                  alt={event.image}
                  sx={{ width: "100%", objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                    padding: 2,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {event.start_date}
                  </Typography>
                  <Typography variant="body2">{event.description}</Typography>
                  <Typography variant="body2">{event.venue}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(event)}
                    sx={{ alignSelf: "center", marginTop: "auto" }}
                  >
                    More Info
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedEvent?.title}</DialogTitle>
        <DialogContent display="flex" flexDirection="column">
          <Typography variant="h6">
            Start Date: {selectedEvent?.start_date}
          </Typography>
          <Typography variant="h6">
            Start Time: {selectedEvent?.start_time}
          </Typography>
          <Typography variant="h6">
            EndDate: {selectedEvent?.end_date}
          </Typography>
          <Typography variant="h6">
            End Time: {selectedEvent?.end_time}
          </Typography>
          <Typography variant="h6">
            Capacity: {selectedEvent?.capacity}
          </Typography>
          <Typography variant="h6">Location: {selectedEvent?.venue}</Typography>
          <Typography variant="body1">{selectedEvent?.description}</Typography>
        </DialogContent>
        <Button
          oneClick = {() => <eventData />}
          variant="contained"
          color="primary"
          sx={{
            padding: 2,
            marginInline: 3,
            marginTop: "auto",
          }}
        >
          buy now
        </Button>
      </Dialog>
    </>
  );
};

export default Event;
