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
import { useParams} from "react-router-dom";

export default function FormDialogDelete() {
    const {eventId} = useParams();
  const [open, setOpen] = React.useState(false);


console.log(eventId);

  const handleDeleteClick = async () => {
    try {

        await axios.delete(`http://localhost:5000/api/event/delete/${eventId}`);
        // logout();
        // navigate("/", { replace: true });

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
        }}
      >
        <Button 
          variant="contained" 
          color='error' 
          sx={{
            width: '500px',
            display: 'flex',
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }} 
          onClick={handleClickOpen}
        >
          Delete this event
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
        <DialogTitle>Delete the event</DialogTitle>
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
