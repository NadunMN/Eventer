import * as React from "react";
import {
  Avatar,
  AvatarGroup,
  Tooltip,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export const EventParticipant = () => {
  const [eventId, setEventId] = useState("");
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Convert binary image data to base64 string for rendering
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

  // Extract event ID from the URL when component is mounted
  useEffect(() => {
    const url = window.location.href;
    const parts = url.split("/");
    const eventUrl = parts[parts.length - 1];
    setEventId(eventUrl);
  }, []);

  // Fetch participants based on event ID
  useEffect(() => {
    const fetchParticipants = async () => {
      if (!eventId) return;
      try {
        const eventResponse = await axios.get(
          `http://localhost:5000/api/event/getEvent/${eventId}`
        );
        const participantIds = eventResponse.data.participants;
        console.log(participantIds);

        // Fetch participant data for each participant ID
        const partiData = await Promise.all(
          participantIds.map(async (partId) => {
            try {
              const userResponse = await axios.get(
                `http://localhost:5000/api/getUserById/${partId}`
              );
              let userData = userResponse.data;

              // Convert avatar binary data to base64 if available
              if (userData.cover_image) {
                const base64Image = convertBinaryToBase64(
                  new Uint8Array(userData.cover_image.data),
                  userData.cover_image.contentType
                );
                userData.cover_image = base64Image;
              }
              return userData;
            } catch (error) {
              console.error("Failed to fetch the user:", error);
              setError("Failed to fetch the user");
              return null;
            }
          })
        );

        setParticipants(partiData); // Set participants, removing any nulls
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event participants:", error);
        setError("Failed to fetch participants");
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  if (loading) {
    return (
      <Box
        sx={{
          mt: 20,
          ml: 50,
          display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          height: "100vh",
          // bgcolor:'black'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Typography>Error: {error}</Typography>;
  userResponse;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Typography variant="h6" sx={{ padding: 5 }}>
          Participants
        </Typography>

        <AvatarGroup
          max={5}
          sx={{
            "& .MuiAvatar-root": {
              width: 40,
              height: 40,
              fontSize: 18,
              boxShadow: 2,
            },
          }}
        >
          {participants.map((participant, index) => (
            <Tooltip title={participant.first_name}>
              <Avatar
                key={index}
                alt={participant.first_name}
                src={participant.cover_image || ""}
              >
                {participant.first_name.charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>
          ))}
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
          <Avatar>D</Avatar>
          <Avatar>E</Avatar>
        </AvatarGroup>
      </div>
    </div>
  );
};
