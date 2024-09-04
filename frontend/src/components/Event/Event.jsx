import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SearchForm from "./SearchForm";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import EventGrids from "./EventGrids";
import EventData from "./EventData";
import RegisteredeEvent from "../RegisteredEvent";

import MediaCard from "../Card";
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
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleNavigate = (event) => {
    if (event) {
      navigate(`/event/${event._id}`);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/event/getEvent"
        );

        let eventData = response.data;

        // Ensure eventData is an array
        if (!Array.isArray(eventData)) {
          eventData = [eventData];
        }

        // Process the event data
        const processedEvents = eventData.map((event) => {
          if (event.cover_image) {
            const base64Image = convertBinaryToBase64(
              new Uint8Array(event.cover_image.data),
              event.cover_image.contentType
            );
            event.cover_image = base64Image;
          }
          return event;
        });

        setListOfEvent(processedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch the event:", error);
        setError("Failed to fetch the event");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [user]);

  //determine if the current path is child route
  const isChildRoute = location.pathname !== "/event";
  const [isSearch, setIsSearch] = useState(false);
  const [isSelectCatagoery, setIsSelectCatagoery] = useState(false);
  return (
    <>
      { !isSearch && (
        <>
          <Container
            fixed
            sx={{
              display: "flex",
              m: 4,
              gap: 2,
            }}
          >
            <CategoryDropdown />
            <SearchForm setListOfEvents={setListOfEvent} setIsSearch/>
          </Container>

          <EventGrids listOfEvent={listOfEvent} handleOpen={handleOpen} />
        </>
      )}
      
      {/* {!isChildRoute && (
        <>
          <Container
            fixed
            sx={{
              display: "flex",
              m: 4,
              gap: 2,
            }}
          >
            <CategoryDropdown />
            <SearchForm setListOfEvents={setListOfEvent} />
          </Container>

          <EventGrids listOfEvent={listOfEvent} handleOpen={handleOpen} />
        </>
      )} */}
      <Outlet />
    </>
  );
};

export default Event;
