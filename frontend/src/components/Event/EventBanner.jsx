import { Card, CardMedia, Box, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function EventBanner({ event }) {
  const [isFav, setIsFev] = useState(false);

  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [favorites, setFavorites] = useState([]);

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
  const handleFav = (event_id) => {
    console.log(event_id);

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
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${event.cover_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          backgroundColor: "#3f51b5",
          height: "400px",
          display: "flex",
          alignItems: "center",
          jestifyContent: "center",
        }}
      >
        <IconButton
          variant="outlined"
          color={favorites.includes(event._id) ? "warning" : "neutral"}
          sx={{ position: "absolute", bottom: 10, right: 40 }}
          onClick={() => handleFav(event._id)}
        >
          {favorites.includes(event._id) ? (
            <FavoriteIcon sx={{ fontSize: 60 }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 60 }} />
          )}
        </IconButton>
        
      </Box>
      <Box>
        <Typography variant="h3" component="h3" sx={{ flexGrow: 6 }}>
          {event.title}
        </Typography>
      </Box>
    </Box>
  );
}

export default EventBanner;
