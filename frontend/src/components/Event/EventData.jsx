import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box, colors, Grid } from "@mui/material";
import EventBanner from "./EventBanner";
import EventDetails from "./EventDetails";
import EventDescription from "./EventDescription";
import { Reviews } from "../Reviews";

// Convert binary data to base64
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

export default function EventData() {
  const { eventId } = useParams(); //get the event ID from the route params
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!eventId) {
  //     <div>"no eventId"</div>;
  //     return;
  //   } //ensure eventId is available

  //   const fetchEvent = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/event/getEvent/${eventId}`
  //       );
  //       setEvent(response.data);
  //       setError(null);
  //     } catch (error) {
  //       setError(
  //         error.response?.data?.message || "cannot fetching the event Data!"
  //       );
  //     } finally {
  //       const timer = setTimeout(() => {
  //         setLoading(false);
  //       }, 1200);
  //     }
  //   };
  //   fetchEvent();
  // }, [eventId]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/event/getEvent/${eventId}`
        );

        let eventData = response.data;
        console.log(eventData);

        // Ensure eventData is an array
        // if (!Array.isArray(eventData)) {
        //   eventData = [eventData];
        // }

        // Process the event data
        if (eventData.cover_image) {
          const base64Image = convertBinaryToBase64(
            new Uint8Array(eventData.cover_image.data),
            eventData.cover_image.contentType
          );
          eventData.cover_image = base64Image;
        }

        setEvent(eventData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch the event:", error);
        setError("Failed to fetch the event");
        setLoading(false);
      } finally {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1200);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <>loading....</>;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <EventBanner event={event} />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <EventDetails event={event} />
          </Grid>

          <Grid item xs={12} md={6}>
            <EventDescription event={event} />
          </Grid>
        </Grid>
      </Container>
      <Reviews />
    </>
  );
}
