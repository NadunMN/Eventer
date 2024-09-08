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
  Checkbox,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";

export const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [openMoreInfoDialog, setOpenMoreInfoDialog] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null); // New state for selected feedback

  const navigate = useNavigate();

  // Fetch feedback
  const fetchFeedback = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/contact/getContacts/`
      );
      setFeedback(res.data);
    } catch (err) {
      console.log("Error fetching Feedback:", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Open delete confirmation dialog
  const handleDeleteConfirmation = (id) => {
    setFeedbackToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Handle the deletion of feedback
  const handleDelete = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      try {
        await axios.delete(
          `http://localhost:5000/api/contact/deleteContact/${feedbackToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setFeedback(feedback.filter((r) => r._id !== feedbackToDelete));
        setAlertMessage("Feedback deleted successfully");
        setAlertSeverity("success");
        setSnackbarOpen(true);
      } catch (err) {
        console.log("Error deleting Feedback:", err);
        setAlertMessage("Error deleting Feedback");
        setAlertSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setDeleteDialogOpen(false);
      }
    } else {
      console.log("User not logged in or invalid access token");
    }
  };

  // Mark feedback as handled/unhandled
  const toggleHandledFeedback = async (id, currentStatus) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      try {
        await axios.put(
          `http://localhost:5000/api/contact/updateContact/${id}`,
          { processed: !currentStatus },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        fetchFeedback(); // Refetch the feedback to get the updated data
        setAlertMessage(
          !currentStatus
            ? "Feedback marked as handled"
            : "Feedback marked as unhandled"
        );
        setAlertSeverity("info");
        setSnackbarOpen(true);
      } catch (err) {
        console.log("Error updating Feedback:", err);
        setAlertMessage("Error updating Feedback");
        setAlertSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  // Handle card click to show full feedback in a dialog
  const handleCardClick = (fb) => {
    setSelectedFeedback(fb);
    setOpenMoreInfoDialog(true);
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Close delete dialog
  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
    setFeedbackToDelete(null);
  };

  // Close more info dialog
  const handleMoreInfoDialogClose = () => {
    setOpenMoreInfoDialog(false);
    setSelectedFeedback(null); // Clear the selected feedback when the dialog is closed
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
        {feedback.map((fb) => (
          <Card
            variant="outlined"
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: fb.processed
                ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                : "0px 6px 12px rgba(0, 0, 0, 0.15)",
              bgcolor: fb.processed ? "grey.200" : "background.default",
              border: fb.processed ? "1px solid" : "none",
              borderColor: fb.processed ? "grey.300" : "transparent",
              opacity: fb.processed ? 0.7 : 1, // Fade processed feedback slightly
              "&:hover": {
                boxShadow: fb.processed
                  ? "0px 6px 12px rgba(0, 0, 0, 0.15)"
                  : "0px 8px 16px rgba(0, 0, 0, 0.2)",
              },
              cursor: "pointer", // Make the card clickable
            }}
            key={fb._id}
            onClick={() => handleCardClick(fb)} // Handle card click
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
                    sx={{
                      fontWeight: 500,
                      color: fb.processed ? "text.secondary" : "text.primary",
                      textDecoration: fb.processed ? "line-through" : "none", // Strikethrough for processed feedback
                    }}
                  >
                    {fb.message.length > 50
                      ? fb.message.substring(0, 50) + "..."
                      : fb.message}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: fb.processed ? "line-through" : "none",
                    }}
                  >
                    {fb.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="Mark as handled">
                    <Checkbox
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      checked={fb.processed}
                      onChange={() =>
                        toggleHandledFeedback(fb._id, fb.processed)
                      }
                      sx={{
                        color: fb.processed ? "success.main" : "text.secondary",
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Delete feedback">
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the card click from triggering
                        handleDeleteConfirmation(fb._id);
                      }}
                      sx={{
                        color: "error.main",
                        "&:hover": {
                          color: "error.dark",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>

      {/* Snackbar for action notifications */}
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
        <DialogTitle>Delete Feedback</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this feedback?
          </Typography>
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

      {/* More info dialog to show full feedback */}
      <Dialog
        open={openMoreInfoDialog}
        onClose={handleMoreInfoDialogClose}
        aria-labelledby="feedback-dialog-title"
        aria-describedby="feedback-dialog-description"
      >
        <DialogTitle id="feedback-dialog-title">Feedback Details</DialogTitle>
        <DialogContent>
          {selectedFeedback && (
            <>
              <Typography variant="body1">
                {selectedFeedback.message}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {selectedFeedback.name}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMoreInfoDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
