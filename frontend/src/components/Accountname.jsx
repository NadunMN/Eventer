import React, { useState, useEffect } from 'react';
import { Stack, Typography, Avatar, Button } from '@mui/material';
import CustomizedDialogs from './Dialog';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

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

function Accountname() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");

  const user_id = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user_id) {
        const jsonString = JSON.stringify(user_id);
        const jwtToken = jwtDecode(jsonString);
        // console.log(jwtToken);
        setUserId(jwtToken._id); // This will trigger the second useEffect
    }
}, [user_id]);


console.log("PAVSDPV",userId);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return; // Ensure userId is set before making the request
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getUserById/${userId}`
        );

        let userData = response.data;

        if (userData.cover_image) {
          const base64Image = convertBinaryToBase64(
            new Uint8Array(userData.cover_image.data),
            userData.cover_image.contentType
          );
          userData.cover_image = base64Image;
        }

        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch the user:", error);
        setError("Failed to fetch the user");
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <div>
      <Stack direction="row" spacing={5} sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3 }}>
        <Avatar alt={`${user.first_name} ${user.last_name}`} src={user.cover_image} title="Nadun Madusanka" sx={{ width: 220, height: 220 }} />
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography sx={{ fontSize: 50, fontWeight: 'bold', color: 'black' }}>{`${user.first_name} ${user.last_name}`}</Typography>
          <Typography>{user.email}</Typography>
          <CustomizedDialogs open={open} handleClose={() => setOpen(false)} />
        </Stack>
      </Stack>
    </div>
  );
}

export default Accountname;
