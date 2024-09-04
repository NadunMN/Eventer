import React, { useState } from "react";
import { InputBase, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

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

// Define the base URL for API requests
const Api_url = "http://localhost";

// Styled components using MUI's `styled` function
const SearchWrapper = styled("div")(({ theme }) => ({
  padding: "8px 5px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: 600,
  margin: "auto",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": { boxShadow: "0 5px 15px 5px rgba(0, 0, 0, .2)" },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 10,
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
  textAlign: "center",
}));

// Component to handle searching for events
const SearchForm = ({ setListOfEvents, setIsSearch }) => {
  const [searchString, setSearchString] = useState(""); // State for the search input
  const [error, setError] = useState(""); // State for error messages
  
  // Function to handle searching events
  const handleSearchEvent = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      // Make a GET request to search events
      const response = await axios.get(
        `${Api_url}:5000/api/event/searchEvents`,
        {
          params: { title: searchString },
        }
      );
      
      let events = response.data;
      
      // Process the event data
      const processedEvents = events.map((event) => {
        if (event.cover_image) {
          const base64Image = convertBinaryToBase64(
            new Uint8Array(event.cover_image.data),
            event.cover_image.contentType
          );
          event.cover_image = base64Image;
        }
        return event;
      });
      
      setListOfEvents(processedEvents); // Update event list with response data
      // setIsSearch(true);
      setError(""); // Clear any existing errors
    } catch (error) {
      setListOfEvents([]); // Clear event list on error
      setError("Event not found or error occurred!"); // Set error message
    }
  };

  return (
    <>
      <form onSubmit={handleSearchEvent}>
        <SearchWrapper>
          <StyledInputBase
            placeholder="Search events..."
            inputProps={{ "aria-label": "search events" }}
            value={searchString} // Bind input value to searchString state
            onChange={(e) => setSearchString(e.target.value)} // Update searchString state on input change
          />
          <StyledIconButton type="submit" aria-label="search">
            <SearchIcon />
          </StyledIconButton>
        </SearchWrapper>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}{" "}
      {/* Display error if it exists */}
    </>
  );
};

export default SearchForm;
