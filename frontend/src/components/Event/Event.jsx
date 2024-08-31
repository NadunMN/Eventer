/* eslint-disable no-undef */
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CardMedia,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SearchForm from "./SearchForm";
import { Navigate, useNavigate } from "react-router-dom";
import EventDialogBox from "./EventDialogBox";

const Event = () => {
  const [listOfEvent, setListOfEvent] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

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

  const handleNavigate = () => {
    if (selectedEvent) {
      navigate(`/event/${selectedEvent._id}`)
    }
  };

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
    lg: 5,
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
      <SearchForm setListOfEvents={setListOfEvent} />

      <Container maxWidth="xl" fixed sx={{ mt: 5 }}>
        <Grid container spacing={2} columns={20}>
          {listOfEvent.map((event) => (
            <Grid item key={event._id} {...gridItemProps}>
              <Card
                sx={{
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
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
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(event)}
                      sx={{
                        alignSelf: "center",
                        marginTop: 1,
                        ml: 1,
                        mr: 2,
                      }}
                    >
                      More Info
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNavigate}
                      sx={{
                        alignSelf: "center",
                        marginTop: 1,
                        ml: 2,
                        mr: 1,
                      }}
                    >
                      Buy
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <EventDialogBox selectedEvent={selectedEvent} open={open} onClose={handleClose} />
    </>
  );
};

export default Event;
