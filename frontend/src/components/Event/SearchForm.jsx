import React, { useState } from "react";
import { InputBase, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Api_url = "http://localhost";

const SearchWrapper = styled('div')(({ theme }) => ({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: 600,
  margin: '20px auto',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 5px 15px 5px rgba(0, 0, 0, .2)',
  },
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
  textAlign: 'center',
}));

const SearchForm = ({ setListOfEvents }) => {
  const [searchString, setSearchString] = useState("");
  const [error, setError] = useState("");

  const handleSearchEvent = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${Api_url}:5000/api/searchEvents`, {
        params: { title: searchString },
      });
      setListOfEvents(response.data);
      setError("");
    } catch (error) {
      setListOfEvents([]);
      setError("Event not found or error occurred!");
    }
  };

  return (
    <>
      <form onSubmit={handleSearchEvent}>
        <SearchWrapper>
          <StyledInputBase
            placeholder="Search events..."
            inputProps={{ "aria-label": "search events" }}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <StyledIconButton type="submit" aria-label="search">
            <SearchIcon />
          </StyledIconButton>
        </SearchWrapper>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default SearchForm;