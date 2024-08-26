import { Box } from '@mui/material';
import React from 'react'
import TemporaryDrawer from './Drawer'
import TextField from '@mui/material/TextField';

function Myprofile() {
  return (
    <Box display={'flex'}>
       <TemporaryDrawer/>

            <Box display={'flex'} flexDirection={'column'} ml= {10} gap={2} mt={5}  component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off">

                       <TextField
                             id="outlined-read-only-input"
                             label="First Name"
                             defaultValue="Nadun"
                             InputProps={{
                               readOnly: true,
                             }}
                             
                       />
                       <TextField
                             id="outlined-read-only-input"
                             label="Last Name"
                             defaultValue="Madusanka"
                             InputProps={{
                               readOnly: true,
                             }}
                       />

                       <TextField
                             id="outlined-read-only-input"
                             label="email"
                             defaultValue="nadunmadusanka564@gmail.com"
                             InputProps={{
                               readOnly: true,
                             }}
                        
                        
                       />
        

            </Box>
    </Box>
  );
}

export default Myprofile
