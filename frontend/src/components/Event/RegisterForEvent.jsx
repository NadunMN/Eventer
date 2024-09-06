import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const RegisterForEvent = () => {
  const { eventId } = useParams(); // Assume eventId is passed via URL params
  const { user } = useAuthContext(); // Assuming user details are fetched from context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // API call to register for the event
      const response = await axios.post(
        `http://localhost:5000/api/event/register/${eventId}`,
        {
          userId: user._id,
          name: user.first_name + " " + user.last_name,
          email: user.email,
          phone: user.phone_number,
        }
      );

      if (response.status === 200) {
        setSuccess("Successfully registered for the event!");
        // Optionally, update the user's registered events in the context or local state
      } else {
        setError("Failed to register for the event. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        "An error occurred while registering. Please check the console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register for Event
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={user ? `${user.first_name} ${user.last_name}` : ""}
          disabled
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={user ? user.email : ""}
          disabled
        />
        <TextField
          label="Phone Number"
          type="tel"
          variant="outlined"
          value={user ? user.phone_number : ""}
          disabled
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        {success && (
          <Typography variant="body2" color="success">
            {success}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default RegisterForEvent;
