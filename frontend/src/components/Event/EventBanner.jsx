import { Box, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function EventBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#3f51b5",
        height: '200px',
        color: 'white',
        display: 'flex',
        alignItems: 'center', 
        jestifyContent: 'center'
      }}
    >
      <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}>
        Event Title
      </Typography>

      <IconButton
        sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
        aria-label="add to favorites"
      >
        <FavoriteBorderIcon />
      </IconButton>
    </Box>
  );
}

export default EventBanner;
