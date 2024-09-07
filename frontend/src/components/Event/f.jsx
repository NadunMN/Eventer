import React, { useState } from "react";
import { IconButton, Snackbar, Alert } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const MyComponent = ({ event, favorites, handleFav }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  const handleFavoriteClick = (eventId) => {
    const isFavorited = favorites.includes(eventId);

    // Update the favorites list
    handleFav(eventId);

    // Set the message based on the action
    if (isFavorited) {
      setMessage("Removed from favorites");
    } else {
      setMessage("Added to favorites");
    }

    // Show the snackbar
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <IconButton
        variant="variant"
        edge="end"
        sx={{
          color: favorites.includes(event._id) ? "#FF5733" : "#AAB7B8", // Custom colors
          position: "absolute",
          bottom: 10,
          right: 40
        }}
        onClick={() => handleFavoriteClick(event._id)}
      >
        {favorites.includes(event._id) ? (
          <FavoriteIcon sx={{ fontSize: 60 }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 60 }} />
        )}
      </IconButton>

      {/* Snackbar for alert */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyComponent;
