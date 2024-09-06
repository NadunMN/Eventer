import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { jwtDecode } from "jwt-decode";
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const {logout} = useLogout();
  const navigate = useNavigate();
  
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



  const handleDeleteClick = async () => {
    try {

        await axios.delete(`http://localhost:5000/api/user/delete/${userId}`);
        logout();
        navigate("/", { replace: true });

    } catch (error) {
        console.error("Failed to save the user:", error);
    }
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <React.Fragment>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center',    // Center vertically
          height: '100vh',         // Ensure full viewport height for vertical centering
        }}
      >
        <Button 
          variant="contained" 
          color='error' 
          sx={{
            width: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }} 
          onClick={handleClickOpen}
        >
          Delete Account
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Delete the Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Once you delete a Account, there is no going back. Please be certain.
          </DialogContentText>
          <DialogContentText variant='body2' color='error' m='2'>
          "All your data will be permanently erased, and it cannot be recovered."
          </DialogContentText>
          
          
        </DialogContent>
        <DialogActions sx={{display:'flex', justifyContent: 'center'}}>
          <Button variant='contained' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color="error" type="submit" onClick={handleDeleteClick}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
