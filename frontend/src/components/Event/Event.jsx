import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SearchForm from "./SearchForm";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import EventGrids from "./EventGrids";
import { Container, Box } from "@mui/material";
import CategoryDropdown from "./CategoryDropdown";
import { useAuthContext } from "../../hooks/useAuthContext";

// Function to convert binary data to base64
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

const Event = () => {
  const [listOfEvent, setListOfEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/event/getEvent"
        );

        let res_data = response.data;

        // Process the event data
        const listOfEvents = res_data.map((event) => {
          if (event.cover_image) {
            const base64Image = convertBinaryToBase64(
              new Uint8Array(event.cover_image.data),
              event.cover_image.contentType
            );
            event.cover_image = base64Image;
          }
          return event;
        });

        setListOfEvent(listOfEvents);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to fetch the event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [user]);

  if (loading) {
    return "Loading ...";
  }

  return (
    <Box>
      <Container
        fixed
        sx={{
          display: "flex",
          m: 4,
          gap: 2,
        }}
      >
        <CategoryDropdown
          setListOfEvents={setListOfEvent}
          setCategory={setCategory}
        />
        <SearchForm setListOfEvents={setListOfEvent} />
      </Container>
      <EventGrids
        listOfEvent={listOfEvent}
        setListOfEvent={setListOfEvent}
        category={category}
      />
    </Box>
  );
};

export default Event;
