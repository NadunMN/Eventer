import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box, colors, Grid } from "@mui/material";
import EventBanner from "./EventBanner";
import EventDetails from "./EventDetails";
import EventDescription from "./EventDescription";

export default function EventData() {
  const { eventId } = useParams(); //get the event ID from the route params
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) {
      <div>"no eventId"</div>;
      return;
    } //ensure eventId is available

    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/event/getEvent/${eventId}`
        );
        setEvent(response.data);
        setError(null);
      } catch (error) {
        setError(
          error.response?.data?.message || "cannot fetching the event Data!"
        );
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

  const image = `/${event.image}`;

  return (
    <Container maxWidth="lg">
      <Box>
        <EventBanner event={event}/>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <EventDetails event={event}/>
        </Grid>

        <Grid item xs={12} md={6}>
          <EventDescription event={event}/>
        </Grid>
      </Grid>
    </Container>
  );
}
