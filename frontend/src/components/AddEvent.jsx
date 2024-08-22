import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Grid,
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

const Input = styled("input")({
  display: "none",
});

const StyledTextField = styled("TextField")({
  padding: "10px",
});

export const AddEvent = () => {
  const [coverImg, setCoverImg] = useState(addImg);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
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
      [name]: '',
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = 'Event Name is required';
    if (!formData.startDate) newErrors.startDate = 'Start Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start Time is required';
    if (!formData.endDate) newErrors.endDate = 'End Date is required';
    if (!formData.endTime) newErrors.endTime = 'End Time is required';
    if (!formData.venue) newErrors.venue = 'Venue is required';
    if (!formData.capacity) newErrors.capacity = 'Capacity is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log(formData);
    // Here send the data to your backend
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", p: 2, mt: 10 }}>
      <Card elevation={0}>
        <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ position: "relative", mb: 2 }}>
                  <img
                    src={coverImg}
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

              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <TextField
                    placeholder="Event Name"
                    name="name"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                        fontWeight: "bold",
                        fontSize: "50px",
                      },
                    }}
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    // required
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
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
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                  />
                  <TextField
                    fullWidth
                    label="Start Time"
                    name="startTime"
                    type="time"
                    value={formData.startTime}
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
                    error={!!errors.startTime}
                    helperText={errors.startTime}
                  />
                  <TextField
                    fullWidth
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
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
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                  />
                  <TextField
                    fullWidth
                    label="End Time"
                    name="endTime"
                    type="time"
                    value={formData.endTime}
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
                    error={!!errors.endTime}
                    helperText={errors.endTime}
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
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
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
            </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
