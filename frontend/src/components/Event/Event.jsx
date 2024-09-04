import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SearchForm from "./SearchForm";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import EventDialogBox from "./EventDialogBox";
import EventGrids from "./EventGrids";
import EventData from "./EventData";

import MediaCard from "../Card";
import { Container, Box } from "@mui/material";
import CategoryDropdown from "./CategoryDropdown";
import { useAuthContext } from "../../hooks/useAuthContext";

const Event = () => {
  const [listOfEvent, setListOfEvent] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  
  //get all events
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/event/getEvent")
      .then((response) => {
        setListOfEvent(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("there was an error fetching ta data! ", error);
      });
  }, [user]);

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

  //determine if the current path is child route
  const isChildRoute = location.pathname !== "/event";

  return (
    <>
      {!isChildRoute && (
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
          <EventDialogBox
            selectedEvent={selectedEvent}
            open={open}
            onClose={handleClose}
          />
        </>
      )}
      <Outlet />
    </>
  );
};

export default Event;
