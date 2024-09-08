import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export const ReviewPannel = () => {
  const [reviews, setReviews] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const navigate = useNavigate();

  // Fetch reviews
  useEffect(() => {
    axios.get(`http://localhost:5000/api/review/`).then((res) => {
      setReviews(res.data);
    });
  }, []);

  const handleEdit = (id) => {
    alert(`Edit comment with id ${id}`);
    // Implement edit functionality here
  };

  // Open delete confirmation dialog
  const handleDeleteConfirmation = (id) => {
    setReviewToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Handle the deletion of a review
  const handleDelete = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      try {
        await axios.delete(
          `http://localhost:5000/api/review/deleteReview/${reviewToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setReviews(reviews.filter((r) => r._id !== reviewToDelete));
        setAlertMessage("Review deleted successfully");
        setAlertSeverity("success");
        setSnackbarOpen(true);
      } catch (err) {
        console.log("Error deleting review:", err);
        setAlertMessage("Error deleting review");
        setAlertSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setDeleteDialogOpen(false); // Close dialog after deletion
      }
    } else {
      console.log("User not logged in or invalid access token");
    }
  };

  // Handle navigating to the event page
  const handleNavigate = (id) => {
    navigate(`/event/${id}`);
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Close delete dialog without deleting
  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
    setReviewToDelete(null);
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        margin: "auto",
        mt: 4,
        padding: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <List>
        {reviews.map((review) => (
          <Card
            variant="outlined"
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
            key={review._id}
          >
            <CardContent>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, cursor: "pointer" }}
                    onClick={() => handleNavigate(review.event_id)}
                  >
                    {review.review.length > 50
                      ? review.review.substring(0, 50) + "..."
                      : review.review}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.user_name} &#x2022; {review.event_title}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    aria-label="edit"
                    sx={{
                      color: "primary.main",
                      "&:hover": {
                        color: "primary.dark",
                      },
                    }}
                    onClick={() => handleNavigate(review.event_id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteConfirmation(review._id)}
                    sx={{
                      color: "error.main",
                      "&:hover": {
                        color: "error.dark",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>

      {/* Snackbar for delete notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this review?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
