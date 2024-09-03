import React from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function EventGrids({ listOfEvent }) {
  const navigate = useNavigate();
  const handleNavigate = (event) => {
    navigate(`/event/${event._id}`);
  };

  const gridItemProps = {
    xs: 20,
    sm: 12,
    md: 8,
    lg: 5,
    sx: {
      mt: 1,
      pl: 8,
      display: "flex",
      flexDirection: "column",
      gutterBottom: 2,
    },
  };
  return (
    <div>
      <Container maxWidth="xl" fixed sx={{ mt: 5 }}>
        <Grid container spacing={2} columns={20}>
          {listOfEvent.map((event) => (
            <Grid item key={event._id} {...gridItemProps}>
              <Card
                sx={{
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f0f0",
                  borderRadius: 3,
                  boxShadow: 10,
                  gap: 2,
                  transition: "al 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={event.image}
                  alt={event.image}
                  sx={{ width: "100%", objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 2,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {event.start_date}
                  </Typography>
                  <Typography variant="body2">{event.description}</Typography>
                  <Typography variant="body2">{event.venue}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: "space-between",
                      alingItems: "center",
                      mt: 4,
                      pl:4,
                      pr:4
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleNavigate(event)}
                    >
                      More info
                    </Button>
                    <FavoriteBorderIcon fontSize="large" />
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 40,
                        color: "gray",
                      }}
                      aria-label="add to favorites"
                      size="xl"
                    ></IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default EventGrids;
