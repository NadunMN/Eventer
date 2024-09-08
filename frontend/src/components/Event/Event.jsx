import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardMedia,
  IconButton,
  CardActions,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForm from "./SearchForm";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import EventGrids from "./EventGrids";
import { useAuthContext } from "../../hooks/useAuthContext";

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

export const Event = () => {
  const [listOfEvent, setListOfEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [register, setRegister] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Alert visibility state
  const [alert, setAlert] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle closing the snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Close the snackbar
  };

  // Set the category from the location state
  useEffect(() => {
    const locationData = location.state || {};
    console.log("locationData");
    console.log(locationData.category);

    locationData.category ? setCategory(locationData.category) : null;
  }, []);

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

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          category
            ? `http://localhost:5000/api/event/getCategory/?category=${category}`
            : "http://localhost:5000/api/event/getEvent"
        );

        let res_data = response.data;
        console.log("res_data");
        console.log(res_data);

        // Process the event data
        const listOfEvents = res_data.map((event) => {
          if (event.cover_image) {
            const base64Image = convertBinaryToBase64(
              new Uint8Array(event.cover_image.data),
              event.cover_image.contentType
            );
            event.cover_image = base64Image;
          }
          return event;
        });

        setListOfEvent(listOfEvents);
        setError("");
      } catch (error) {
        if (error.response?.status === 404) {
          setListOfEvent([]);
          console.log("No events found (404)");
          return;
        }

        console.error("Failed to fetch data:", error);
        setError("Failed to fetch the event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [category]);

  // Handle category change
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "") {
      setCategory("");
      return;
    }
    setCategory(selectedCategory);
  };

  // Handle navigation to event details
  const handleNavigate = (event_id) => {
    navigate(`/event/${event_id}`);
  };

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
        isFav
          ? setMessage("Event removed from your favorites")
          : setMessage("Event added to favorites");
        isFav ? setAlert("info") : setAlert("success");
        console.log(isFav ? "Removed from favorites" : "Added to favorites");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        setAlert("error");
        setMessage("Failed to add event to favorites");
        setSnackbarOpen(true);
        console.error(err);
      });
  };

  //Handle evet registere
  const handleRegister = async (event_id) => {
    try {
      // Fetch the latest participants for the event
      const eventResponse = await axios.get(
        `http://localhost:5000/api/event/getEvent/${event_id}`
      );
      const currentParticipants = eventResponse.data.participants;

      const isReg = register.includes(event_id);
      const updatedRegister = isReg
        ? register.filter((id) => id !== event_id)
        : [...register, event_id];

      const updatedParticipants = isReg
        ? currentParticipants.filter((id) => id !== userId)
        : [...currentParticipants, userId];

      // First, update the user's registered events
      await axios.put(`http://localhost:5000/api/user/edit/${userId}`, {
        registered_events: updatedRegister,
      });

      // Then, update the event's participants
      await axios.put(`http://localhost:5000/api/event/edit/${event_id}`, {
        participants: updatedParticipants,
      });

      // Update the local state after both requests succeed
      setRegister(updatedRegister);
      isReg
        ? setMessage("Unegistered for event successfully")
        : setMessage("Registered for event successfully");
      isReg ? setAlert("info") : setAlert("success");
      setSnackbarOpen(true);
      console.log(isReg ? "Removed from Register" : "Added to Register");
    } catch (err) {
      setAlert("error");
      setMessage("Failed to register for event");
      setSnackbarOpen(true);
      console.error("Error while registering/unregistering", err);
    }
  };

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

  return (
    <Box>
      {/* Search form and category dropdown */}
      <Container maxWidth="lg">
        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 40,
            justifyContent: "center",
          }}
        >
          <FormControl
            fullWidth
            sx={{
              boxShadow: 4,
              maxWidth: 600,
              m: 1,
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 5px 15px 5px rgba(0, 0, 0, .2)",
              },
            }}
          >
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="event">Event</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="parties">Parties</MenuItem>
              <MenuItem value="communities">Communities</MenuItem>
              <MenuItem value="theaters">Theaters</MenuItem>
              <MenuItem value="concerts">Concerts</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ ml: 2, width: "100%", maxWidth: 500 }}>
            <SearchForm setListOfEvents={setListOfEvent} />
          </Box>
        </Box>
      </Container>

      {/* Event cards */}
      <Container maxWidth="xl" fixed sx={{ mt: 9 }}>
        <Grid container spacing={8} columns={20}>
          {listOfEvent.map((event) => (
            <Grid item key={event._id} xs={20} sm={12} md={8} lg={5}>
              <Card
                sx={{
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  position: "relative",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f0f0",
                  borderRadius: 3,
                  boxShadow: 10,
                  gap: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  sx={{ minHeight: 150 }}
                  image={
                    event.cover_image || "https://via.placeholder.com/345x140"
                  }
                  title={event.title}
                />
                <CardContent
                  sx={{
                    minHeight: 150,
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    mt: 0,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {event.start_date}
                  </Typography>
                  <Typography variant="body2">
                    {event.description.slice(0, 200)}
                  </Typography>
                  <Typography variant="body2">{event.venue}</Typography>
                </CardContent>
                <CardActions
                  sx={{
                    minHeight: 50,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 0,
                    pl: 1,
                    pr: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNavigate(event._id)}
                  >
                    More info
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleRegister(event._id, event.participants)
                    }
                  >
                    {register.includes(event._id) ? "Unregister" : "Register"}
                  </Button>
                  <Box>
                    <IconButton
                      variant="outlined"
                      color={
                        favorites.includes(event._id) ? "warning" : "neutral"
                      }
                      sx={{ mr: "auto" }}
                      onClick={() => handleFav(event._id)}
                    >
                      {favorites.includes(event._id) ? (
                        <FavoriteIcon sx={{ fontSize: 30 }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 30 }} />
                      )}
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* alert  */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={alert}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
