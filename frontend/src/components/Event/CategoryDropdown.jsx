import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const CategoryDropdown = ({ setListOfEvents }) => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleChange = async (event) => {
    const selectedCategory = event;
    setCategory(selectedCategory);
    setSelectedCategory(selectedCategory);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/event/getCategory`,
        {
          params: { category: selectedCategory },
        }
      );
      let eventData = response.data;

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

      setListOfEvents(processedEvents);
      setError("");

      if (selectedCategory == "") {
        setListOfEvents([]);
        navigate(`/`);
      }
      if (selectedCategory) {
        navigate(`/${selectedCategory}`);
      }
    } catch (error) {
      setCategory("");
      console.error("Failed to fetch the events:", error);
      setError("Failed to fetch the events");
    }
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{
        m: "auto",
        boxShadow: 2,
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 5px 15px 5px rgba(0, 0, 0, .2)",
        },
      }}
    >
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={category}
        onChange={(e) => {
          handleChange(e.target.value)
          console.log(e.target.value)
        }}
        label="Category"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="event">Event</MenuItem>
        <MenuItem value="sports">Sports</MenuItem>
        <MenuItem value="parties">Parties</MenuItem>
        <MenuItem value="communities">Communities</MenuItem>
        <MenuItem value="theaters">Theaters</MenuItem>
        <MenuItem value="concerts">Concerts</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;
