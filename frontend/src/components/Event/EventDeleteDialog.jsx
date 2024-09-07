import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function FormDialogDelete() {
  const { eventId } = useParams();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success"); // Set default severity

  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    try {
      // Attempt to delete the event
      await axios.delete(`http://localhost:5000/api/event/delete/${eventId}`);
      setAlertMessage("Event deleted successfully!"); 
      setAlertSeverity("success"); 
      setSnackbarOpen(true); 
      setTimeout(() => {
        navigate("/event", { replace: true });
      }, 2000);

    } catch (error) {
      setAlertMessage("Failed to delete the event."); 
      setAlertSeverity("error"); 
      setSnackbarOpen(true);
      console.error("Failed to delete the event:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Close the snackbar
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
          justifyContent: 'center', 
          alignItems: 'center',   
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
            handleClose();
          },
        }}
      >
        <DialogTitle>Delete the event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you delete an account, there is no going back. Please be certain.
          </DialogContentText>
          <DialogContentText variant='body2' color='error' m='2'>
            "All your data will be permanently erased, and it cannot be recovered."
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color="error" type="submit" onClick={handleDeleteClick}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
