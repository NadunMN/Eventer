import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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

const CategoryDropdown = () => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState(""); // State for error messages


  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
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
        onChange={handleChange}
        label="Category"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="event">event</MenuItem>
        <MenuItem value="sports">sports</MenuItem>
        <MenuItem value="parties">parties</MenuItem>
        <MenuItem value="communitie">communitie</MenuItem>
        <MenuItem value="theaters">theaters</MenuItem>
        <MenuItem value="concerts">concerts</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;
