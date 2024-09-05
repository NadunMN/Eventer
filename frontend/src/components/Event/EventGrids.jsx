import React, { useState } from "react";
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
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

function EventGrids({ listOfEvent, handleOpen }) {
  const navigate = useNavigate();

  const handleNavigate = (event) => {
    handleOpen(true);
    navigate(`/event/${event._id}`);
  };

  const [isFavorite, setIsFavorite] = useState(false);

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
      <Container maxWidth="xl" fixed sx={{ mt: 9 }}>
        <Grid container spacing={8} columns={20}>
          {listOfEvent.map((event) => (
            <Grid item key={event._id} {...gridItemProps}>
              <Card
                sx={{
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  position: "relative",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f0f0",
                  borderRadius: 3,
                  boxShadow: 10,
                  gap: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  sx={{
                    minHeight: 150,
                  }}
                  image={
                    event.cover_image || "https://via.placeholder.com/345x140"
                  }
                  title={event.title}
                />
                <CardContent
                  sx={{
                    minHeight: 150,
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    mt: 0,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {event.start_date}
                  </Typography>
                  <Typography variant="body2">
                    {event.description.slice(0, 200)}
                  </Typography>
                  <Typography variant="body2">{event.venue}</Typography>
                </CardContent>
                <CardActions
                  sx={{
                    minHeight: 50,
                    display: "flex",
                    justifyContent: "space-between",
                    alingItems: "center",
                    mt: 0,
                    pl: 4,
                    pr: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNavigate(event)}
                  >
                    More info
                  </Button>
                  <Box>
                    <IconButton
                      variant="outlined"
                      color={isFavorite ? "warning" : "neutral"}
                      sx={{ mr: "auto" }}
                      onClick={() => {
                        setIsFavorite(!isFavorite);
                      }}
                    >
                      <FavoriteBorder sx={{ fontSize: 30 }} />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default EventGrids;
