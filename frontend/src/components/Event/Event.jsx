import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SearchForm from "./SearchForm";
import { Navigate, useNavigate } from "react-router-dom";
import EventDialogBox from "./EventDialogBox";
import EventGrids from "./EventGrids";

const Event = () => {
  const [listOfEvent, setListOfEvent] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  //get all events
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getEvent")
      .then((response) => {
        setListOfEvent(response.data);
      })
      .catch((error) => {
        console.error("there was an error fetching ta data! ", error);
      });
  }, []);

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

  return (
    <>
      <SearchForm setListOfEvents={setListOfEvent} />
      <EventGrids
        listOfEvent={listOfEvent}
        handleOpen={handleOpen}
        handleNavigate={handleNavigate}
      />
      <EventDialogBox
        selectedEvent={selectedEvent}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export default Event;
