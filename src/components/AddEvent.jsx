import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CalendarToday,
  AccessTime,
  Room,
  People,
  Description,
  AddPhotoAlternate,
} from '@mui/icons-material';

import addImg from '../asset/addImage.jpg'

const Input = styled('input')({
  display: 'none',
});

export const AddEvent = () => {
  const [coverImg, setCoverImg] = useState(addImg);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    venue: '',
    description: '',
    capacity: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
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
    console.log(formData);
    // Here you would typically send the data to your backend
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
      <Card>
        <CardHeader title="Create New Event" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <img
                    src={coverImg}
                    alt="Event cover"
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleImageChange} />
                    <IconButton 
                      color="primary" 
                      aria-label="upload picture" 
                      component="span"
                      sx={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: 'background.paper' }}
                    >
                      <AddPhotoAlternate />
                    </IconButton>
                  </label>
                </Box>
              </Grid>

              <Grid item xs={12}>
              <TextField
                    placeholder="Event Name"
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
                    onChange={(e)=>setName(e.target.value)}
                  />
              </Grid>

              <Grid item xs={6}>
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
                />
              </Grid>

              <Grid item xs={6}>
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
                />
              </Grid>

              <Grid item xs={6}>
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
                />
              </Grid>

              <Grid item xs={6}>
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
                />
              </Grid>

              <Grid item xs={12}>
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
                />
              </Grid>

              <Grid item xs={12}>
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
              </Grid>

              <Grid item xs={12}>
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
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
            Create Event
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
