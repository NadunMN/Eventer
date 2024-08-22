import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ContactForm from './contactForm';


export const Contact = () => {
  return (
    <Container>
      <ContactForm /> 
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Additional Contact Information
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> 5/A, Samagi Mawatha, Colombo 05
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> +94 11 122 8340
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> lankatea@gmail.com
        </Typography>
      </Box>
    </Container>
  );
};


