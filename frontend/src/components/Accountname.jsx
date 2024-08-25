import React, { useState } from 'react';
import { Stack, Typography, Avatar, Button } from '@mui/material';
import CustomizedDialogs from './Dialog'; // Assuming Dialog is correctly set up in this file

function Accountname() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Stack direction="row" spacing={5} sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3 }}>
        <Avatar alt="Nadun Madusanka" src="../asset/eraji.jpg" title="Nadun Madusanka" sx={{ width: 220, height: 220 }} />
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography sx={{ fontSize: 50, fontWeight: 'bold', color: 'black' }}>Nadun Madusanka</Typography>
          <Typography>nadunmadusanka564@gmail.com</Typography>
            <CustomizedDialogs open={open} handleClose={handleClose} />
        </Stack>
      </Stack>
    </div>
  );
}

export default Accountname;
