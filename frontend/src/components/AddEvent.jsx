import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CalendarToday,
  AccessTime,
  Room,
  People,
  Description,
  AddPhotoAlternate,
} from "@mui/icons-material";

import addImg from "../asset/addImage.jpg";
import axios from "axios";

const Input = styled("input")({
  display: "none",
});

export const AddEvent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  console.log(token);

  const [coverImg, setCoverImg] = useState(null); // Initialize with null
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    venue: "",
    description: "",
    capacity: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImg(file); // Store the file object
      console.log("File:", file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title) newErrors.title = "Event title is required";
    if (!formData.start_date) newErrors.start_date = "Start Date is required";
    if (!formData.start_time) newErrors.start_time = "Start Time is required";
    if (!formData.end_date) newErrors.end_date = "End Date is required";
    if (!formData.end_time) newErrors.end_time = "End Time is required";
    if (!formData.venue) newErrors.venue = "Venue is required";
    if (!formData.capacity) newErrors.capacity = "Capacity is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(formData);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (coverImg) {
      formDataToSend.append("cover_image", coverImg, coverImg.name);
    }
    console.log(formDataToSend);
    console.log("Appended cover_image:", coverImg);

    try {
      await axios.post(
        "http://localhost:5000/api/event/createEvent",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Event created successfully!");
      console.log("Appended cover_image:", coverImg);
    } catch (error) {
      console.log("Error uploading event:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", p: 2, mt: 10 }}>
      <Card elevation={0}>
        <CardContent>
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <TextField
                  placeholder="Event Title"
                  name="title"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                      fontWeight: "bold",
                      fontSize: "50px",
                    },
                  }}
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  error={!!errors.title}
                  helperText={errors.title}
                />
                <TextField
                  fullWidth
                  label="Start Date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.start_date}
                  helperText={errors.start_date}
                />
                <TextField
                  fullWidth
                  label="Start Time"
                  name="start_time"
                  type="time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTime />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.start_time}
                  helperText={errors.start_time}
                />
                <TextField
                  fullWidth
                  label="End Date"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.end_date}
                  helperText={errors.end_date}
                />
                <TextField
                  fullWidth
                  label="End Time"
                  name="end_time"
                  type="time"
                  value={formData.end_time}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTime />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.end_time}
                  helperText={errors.end_time}
                />
                <TextField
                  fullWidth
                  label="Venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Room />
                      </InputAdornment>
                    ),
                  }}
                  required
                  error={!!errors.venue}
                  helperText={errors.venue}
                />
                <TextField
                  fullWidth
                  label="Description(*Max 200 characters)"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  inputProps={{
                    maxLength: 200,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <People />
                      </InputAdornment>
                    ),
                  }}
                  required
                  error={!!errors.capacity}
                  helperText={errors.capacity}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Create Event
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ position: "relative", mb: 2, mt: 15 }}>
                <img
                  src={coverImg ? URL.createObjectURL(coverImg) : addImg}
                  alt="Event cover"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <label htmlFor="icon-button-file">
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
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      backgroundColor: "background.paper",
                    }}
                  >
                    <AddPhotoAlternate />
                  </IconButton>
                </label>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
