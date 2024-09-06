import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { jwtDecode } from "jwt-decode";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const Reviews = () => {
  const [eventId, setEventId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [value, setValue] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [userId, setUserId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Alert visibility state

  useEffect(() => {
    const url = window.location.href;

    const parts = url.split("/");
    const Eventurl = parts[parts.length - 1];
    setEventId(Eventurl);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const jsonString = JSON.stringify(user);

      const jwtToken = jwtDecode(jsonString);
      setUserId(jwtToken._id);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/review/getReview/${eventId}`)
      .then((res) => {
        setReviews(res.data);
      });
  }, [eventId]);

  const handleReview = (event) => {
    setUserReview(event.target.value);
  };

  const handleClick = async () => {
    const rev = {
      user_id: userId,
      event_id: eventId,
      review: userReview,
      rating: value,
    };
    try {
      await axios.post("http://localhost:5000/api/review/addReview", rev);
      setReviews([...reviews, rev]);
      setUserReview("");
      setValue(0);
      setSnackbarOpen(true); // Show alert when review is added successfully
    } catch (err) {
      console.log("Error adding review:", err);
    }
  };

  const handleMenuClick = (event, review) => {
    setAnchorEl(event.currentTarget);
    setSelectedReview(review);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReview(null);
  };

  const handleEditClick = () => {
    setUserReview(selectedReview.review);
    setValue(selectedReview.rating);
    handleMenuClose();
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/review/deleteReview/${selectedReview._id}`
      );
      setReviews(reviews.filter((r) => r._id !== selectedReview._id));
    } catch (err) {
      console.log("Error deleting review:", err);
    }
    handleMenuClose();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Close the snackbar
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "75%",
          minHeight: 550,
          padding: 4,
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              marginBottom: 2,
              fontWeight: "bold",
            }}
          >
            Add Your Review
          </Typography>

          <Rating
            name="review"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <TextField
            label="Your Review"
            variant="outlined"
            margin="normal"
            sx={{
              width: 450,
              height: 60,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
              "& .MuiInputBase-input": {
                fontSize: "16px",
                padding: "12px",
                lineHeight: "1.5",
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: "14px",
                color: "#666",
                "&.Mui-focused": {
                  color: "#1976d2",
                },
              },
            }}
            inputProps={{
              maxLength: 80,
            }}
            value={userReview}
            onChange={handleReview}
          />
          <Button
            variant="contained"
            sx={{
              height: 50,
              marginLeft: 2,
              padding: "0 20px",
              backgroundColor: "#1976d2",
            }}
            onClick={handleClick}
          >
            Post
          </Button>
        </div>

        <Grid
          container
          spacing={3}
          sx={{
            position: "relative",
          }}
        >
          {reviews
            ? reviews.map((review) => (
                <Grid item xs={9} sm={6} md={4} key={review._id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                    }}
                  >
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                        <IconButton
                          aria-label="more"
                          onClick={(event) => handleMenuClick(event, review)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                          <MenuItem onClick={handleDeleteClick}>
                            Delete
                          </MenuItem>
                        </Menu>
                      </div>
                      <Typography variant="h6" component="div" gutterBottom>
                        {review.review}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Event ID: {review.event_id}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {`By User: ${review.user_id}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </Paper>

      {/* Alert for Successfull review */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Review added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
