import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';

export default function AlertButton() {
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(true);
    // Optionally hide the alert after a certain time
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Adjust the timeout duration as needed
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Show Alert
      </Button>
      {showAlert && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>
      )}
    </div>
  );
}
