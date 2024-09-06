import React, { useState,useEffect } from "react";
import { IconButton, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AddPhotoAlternate } from "@mui/icons-material";
import addImg from "../asset/addImage.jpg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
// import Snackbar from "@mui/material";
import Snackbar from '@mui/material/Snackbar';



const Input = styled("input")({
  display: "none",
});

const ImageUpload = ({ onImageChange }) => {
  const [coverImg, setCoverImg] = useState(null);
  const [userId, setUserId] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");



  console.log(userId);





  const user_id = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
      if (user_id) {
          const jsonString = JSON.stringify(user_id);
          const jwtToken = jwtDecode(jsonString);
          // console.log(jwtToken);
          setUserId(jwtToken._id); // This will trigger the second useEffect
      }
  }, [user_id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImg(file);
      if (onImageChange) onImageChange(file); // Optional callback to pass file to parent
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImg) {
      setAlertMessage("No image selected. Please choose an image to upload.");
      setSnackbarOpen(true);
      return;
    }

    // FormData to send the selected image file to the backend
    const formDataToSend = new FormData();
    formDataToSend.append("cover_image", coverImg, coverImg.name);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/updatedUserImage/${userId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      {
        setAlertMessage("Profile image updated successfully!");
        setSnackbarOpen(true);
        
      };
        
      console.log("Response data:", response.data);
      // Handle success (e.g., update state/UI with the new image)
    } catch (error) {
      console.error("Error updating profile image:", error);
      // Handle error (e.g., display an error message)
    }
  };


  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Close the snackbar
  };


  return (
    <Box
      sx={{
        position: "relative",
        mb: 2,
        mt: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={coverImg ? URL.createObjectURL(coverImg) : addImg}
        alt="Profile"
        style={{
          width: "100%",
          maxWidth: 200,
          height: 200,
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />
      <label htmlFor="icon-button-file" style={{ marginTop: "10px" }}>
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          sx={{
            backgroundColor: "background.paper",
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
        >
          <AddPhotoAlternate />
        </IconButton>
      </label>
      <Button
        onClick={handleSubmit}
        
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          borderRadius: 10,
          padding: "10px 20px",
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Upload a Profile Image
      </Button> 

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={alertMessage==="Profile image updated successfully!"? "success": "error" } sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>

    </Box>

  );
};

export default ImageUpload;
