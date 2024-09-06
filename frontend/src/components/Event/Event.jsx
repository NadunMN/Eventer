import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuthContext } from "../../hooks/useAuthContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardMedia,
  IconButton,
  CardActions,
} from "@mui/material";
import EventGrids from "./EventGrids";
import CategoryDropdown from "./CategoryDropdown";
import SearchForm from "./SearchForm";

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

const Event = () => {
  //useStates
  const [userRole, setUserRole] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [registeredList, setRegisteredList] = useState([]);
  const [listOfEvent, setListOfEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();

  // useEffects
  // Fetch user data from local storage
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
        })
        .catch((err) => {
          console.error("Failed to fetch user data", err);
        });
    }
  }, []);

  //fetch all events
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/event/getEvent"
        );

        let res_data = response.data;

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
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to fetch the event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [user]);

  //fetch category based events
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (category) {
          const response = await axios.get(
            `http://localhost:5000/api/event/getCategory/?category=${category}`
          );
          setResponseData(response.data);
        } else {
          const response = await axios.get(
            "http://localhost:5000/api/event/getEvent"
          );
          setResponseData(response.data);
          console.log(responseData);
        }

        if (response.state === 404) {
          console.log("No events found");
          return;
        }

        let res_data = responseData;
        // Process the event dataa
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

        if (listOfEvents.length === 0) {
          setListOfEvent([]);
          console.log("No events found");
          console.log(listOfEvents);
        } else {
          setListOfEvent(listOfEvents);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to fetch the event");
      }
    };
    fetchEvent();
  }, [category]);

  if (loading) {
    return "Loading ...";
  }

  return (
    <Box>
      <Container
        fixed
        sx={{
          display: "flex",
          m: 4,
          gap: 2,
        }}
      >
        {/* <CategoryDropdown
          setListOfEvents={setListOfEvent}
          setCategory={setCategory}
        /> */}
        <FormControl
          fullWidth
          variant="outlined"
          sx={{
            m: "auto",
            boxShadow: 2,
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
            onChange={(e) => {
              setCategory(e.target.value);
            }}
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

        <SearchForm setListOfEvents={setListOfEvent} />

      </Container>

      <Container maxWidth="xl" fixed sx={{ mt: 9 }}>
        <Grid container spacing={8} columns={20}>
          {listOfEvent.map((event) => (
            <Grid
              item
              key={event._id}
              xs={20}
              sm={12}
              md={8}
              lg={5}
              sx={{
                mt: 1,
                pl: 8,
                display: "flex",
                flexDirection: "column",
                gutterBottom: 2,
              }}
            >
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
                  sx={{
                    minHeight: 150,
                  }}
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
                    onClick={() => handleNavigate(event)}
                  >
                    More info
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRegister(event._id)}
                  >
                    Register
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
    </Box>
  );
};

export default Event;
