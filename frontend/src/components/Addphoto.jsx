import React, { useState,useEffect } from "react";
import { IconButton, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AddPhotoAlternate } from "@mui/icons-material";
import addImg from "../asset/addImage.jpg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const Input = styled("input")({
  display: "none",
});

const ImageUpload = ({ onImageChange }) => {
  const [coverImg, setCoverImg] = useState(null);
  const [userId, setUserId] = useState("");

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
      alert("No image selected.");
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
      {alert("Profile image updated successfully!")};
        
      console.log("Response data:", response.data);
      // Handle success (e.g., update state/UI with the new image)
    } catch (error) {
      console.error("Error updating profile image:", error);
      // Handle error (e.g., display an error message)
    }
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
          borderRadius: 1,
          padding: "10px 20px",
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Upload a Profile Image
      </Button>
    </Box>
  );
};

export default ImageUpload;
