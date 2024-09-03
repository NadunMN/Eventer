import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    <>
      <h1>{event.title}</h1>
      {eventId}
      <div>hi</div>
    </>
  );
}
