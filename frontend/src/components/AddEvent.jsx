import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
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
import { jwtDecode } from "jwt-decode"; // Correct import

const Input = styled("input")({
  display: "none",
});

export const AddEvent = () => {
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState(""); // For event category

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const jwStr = jwtDecode(token);
    const user_id = jwStr._id;
    setUserId(user_id);
  }, []);

  const [coverImg, setCoverImg] = useState(null);
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
      setCoverImg(file);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
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
    if (!category) newErrors.category = "Event category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (coverImg) {
      formDataToSend.append("cover_image", coverImg, coverImg.name);
    }
    formDataToSend.append("created_by", userId);
    const created_at = new Date().toISOString();
    formDataToSend.append("created_at", created_at);
    formDataToSend.append("category", category);

    try {
      await axios.post(
        "http://localhost:5000/api/event/createEvent",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Event created successfully!");
    } catch (error) {
      console.log("Error uploading event:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", p: 3, mt: 8, height: "100vh" }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Create New Event
      </Typography>
      <Card elevation={4} sx={{ borderRadius: 4, p: 4 }}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  variant="filled"
                  label="Event Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  InputProps={{
                    style: { fontSize: "20px", fontWeight: "bold" },
                  }}
                />
                <TextField
                  variant="filled"
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
                  error={!!errors.start_date}
                  helperText={errors.start_date}
                />
                <TextField
                  variant="filled"
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
                  error={!!errors.start_time}
                  helperText={errors.start_time}
                />
                <TextField
                  variant="filled"
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
                  error={!!errors.end_date}
                  helperText={errors.end_date}
                />
                <TextField
                  variant="filled"
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
                  error={!!errors.end_time}
                  helperText={errors.end_time}
                />
                <TextField
                  variant="filled"
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
                  error={!!errors.venue}
                  helperText={errors.venue}
                />
                <TextField
                  variant="filled"
                  fullWidth
                  label="Description (*Max 200 characters)"
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
                  variant="filled"
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
                  error={!!errors.capacity}
                  helperText={errors.capacity}
                />

                {/* Category Dropdown */}
                <FormControl variant="filled" fullWidth required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    error={!!errors.category}
                  >
                    <MenuItem value={"sports"}>Sports</MenuItem>
                    <MenuItem value={"parties"}>Parties</MenuItem>
                    <MenuItem value={"communities"}>Communities</MenuItem>
                    <MenuItem value={"theaters"}>Theaters</MenuItem>
                    <MenuItem value={"concerts"}>Concerts</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{
                    height: "50px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "12px",
                  }}
                >
                  Create Event
                </Button>
              </Box>
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  mt: { xs: 4, md: 0 },
                }}
              >
                <img
                  src={coverImg ? URL.createObjectURL(coverImg) : addImg}
                  alt="Event cover"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
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
                      bottom: -25,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      boxShadow: 2,
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
