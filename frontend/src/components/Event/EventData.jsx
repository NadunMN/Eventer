import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  colors,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import EventBanner from "./EventBanner";
import EventDetails from "./EventDetails";
import { Reviews } from "../Reviews";
import { EventParticipant } from "./EventParticipant";

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

export default function EventData(handleNavigate) {
  const { eventId } = useParams(); //get the event ID from the route params
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [register, setRegister] = useState([]);
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [favorites, setFavorites] = useState([]);

  //get user data from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const jwtToken = jwtDecode(user.token);
      setUserId(jwtToken._id);
      setUserRole(jwtToken.role);
      axios
        .get(`http://localhost:5000/api/user/${jwtToken._id}`)
        .then((res) => {
          setFavorites(res.data.favourite_events || []);
          setRegister(res.data.registered_events || []);
        })
        .catch((err) => {
          console.error("Failed to fetch user data", err);
        });
    }
  }, []);

  // Handle favorite event
  const handleFav = (event_id) => {
    const isFav = favorites.includes(event_id);
    const updatedFavorites = isFav
      ? favorites.filter((id) => id !== event_id)
      : [...favorites, event_id];

    axios
      .put(`http://localhost:5000/api/user/edit/${userId}`, {
        favourite_events: updatedFavorites,
      })
      .then(() => {
        setFavorites(updatedFavorites);
        console.log(isFav ? "Removed from favorites" : "Added to favorites");
      })
      .catch((err) => {
        alert("An error occurred. Please check the console");
        console.error(err);
      });
  };

  //Hadle evet registere
  const handleRegister = (event_id) => {
    const isReg = register.includes(event_id);
    const updatedRegister = isReg
      ? register.filter((id) => id !== event_id)
      : [...register, event_id];

    axios
      .put(`http://localhost:5000/api/user/edit/${userId}`, {
        registered_events: updatedRegister,
      })
      .then(() => {
        setRegister(updatedRegister);
        console.log(isReg ? "Removed from Register" : "Added to Register");
      })
      .catch((err) => {
        alert("An error occurred. Please check the console");
        console.error(err);
      });
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/event/getEvent/${eventId}`
        );

        let eventData = response.data;
        console.log(eventData);

        // Process the event data
        if (eventData.cover_image) {
          const base64Image = convertBinaryToBase64(
            new Uint8Array(eventData.cover_image.data),
            eventData.cover_image.contentType
          );
          eventData.cover_image = base64Image;
        }

        setEvent(eventData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch the event:", error);
        setError("Failed to fetch the event");
        setLoading(false);
      } finally {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1200);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <EventBanner event={event} />
        </Box>
        <Grid container spacing={4}></Grid>
        <Grid item xs={12} md={6}>
          <EventDetails event={event} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1">{event.description}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRegister(event._id)}
          >
            {register.includes(event._id) ? "Unregister" : "Register"}
          </Button>
        </Grid>
      </Container>
      <EventParticipant />
      <Reviews />
    </>
  );
}
