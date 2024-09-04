import { Card, CardMedia, Box, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function EventBanner({ event }) {
  console.log(event.cover_image);
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${event.cover_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          backgroundColor: "#3f51b5",
          height: "400px",
          display: "flex",
          alignItems: "center",
          jestifyContent: "center",
        }}
      >
        <IconButton
          sx={{ position: "absolute", bottom: 10, right: 40, color: "gray" }}
          aria-label="add to favorites"
          size="xl"
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>
      <Box>
        <Typography variant="h3" component="h3" sx={{ flexGrow: 6 }}>
          {event.title}
        </Typography>
      </Box>
    </Box>
  );
}

export default EventBanner;
