import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategoryDropdown from "./CategoryDropdown";
import { Container, Typography } from "@mui/material";
import TemporaryDrawer from "../Drawer";

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
          `http://localhost:5000/api/getEvent/${eventId}`
        );
        setEvent(response.data);
        setError(null);
      } catch (error) {
        setError(
          error.response?.data?.message || "cannot fetching the event Data!"
        );
      } finally {
        setLoading(false);
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
    <Container fixed>
      <image></image>
      <Typography variant="h2">{event.title}</Typography>
      <Typography variant="p">{event.description}</Typography>
      <Typography variant="h6">Start Date: {event.start_date}</Typography>

      <div>
        <Typography variant="h6">EndDate: {event.end_date}</Typography>
      </div>
      <div>
        <Typography variant="h6">Start Time: {event.start_time}</Typography>
        <Typography variant="h6">End Time: {event.end_time}</Typography>
      </div>
    </Container>
  );
}
