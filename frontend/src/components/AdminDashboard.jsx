import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Event as EventIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { AddUser } from "./AddUser";

export const AdminDashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState([]);
  const [activeTab, setActiveTab] = useState("events");
  const [darkMode, setDarkMode] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const monthlyData = {
    Jan: { events: 0, attendees: 0 },
    Feb: { events: 0, attendees: 0 },
    Mar: { events: 0, attendees: 0 },
    Apr: { events: 0, attendees: 0 },
    May: { events: 0, attendees: 0 },
    Jun: { events: 0, attendees: 0 },
    Jul: { events: 0, attendees: 0 },
    Aug: { events: 0, attendees: 0 },
    Sep: { events: 0, attendees: 0 },
    Oct: { events: 0, attendees: 0 },
    Nov: { events: 0, attendees: 0 },
    Dec: { events: 0, attendees: 0 },
  };

  // Fetch data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const token = user.token;

      // Fetch events
      axios
        .get("http://localhost:5000/api/event/getEvent", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const eventsData = res.data;
          setEvents(eventsData);
          console.log("Events data:", eventsData);
          console.log("Parti", events.participants);

          // Process monthly data
          const monthlyDataCopy = { ...monthlyData }; // Copy to avoid mutating the original object
          eventsData.forEach((event) => {
            const eventDate = new Date(event.start_date);
            const month = eventDate.toLocaleString("default", {
              month: "short",
            });

            if (monthlyDataCopy[month]) {
              monthlyDataCopy[month].events += 1;
              monthlyDataCopy[month].attendees += event.participants.length;
            }
          });

          // Convert the object into the desired array format
          const formattedData = Object.keys(monthlyDataCopy).map((month) => ({
            name: month,
            events: monthlyDataCopy[month].events,
            attendees: monthlyDataCopy[month].attendees,
          }));

          setChartData(formattedData);
          console.log(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });

      // Fetch users
      axios
        .get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserData(res.data);
          console.log("User data:", res.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    } else {
      console.error("No user token found.");
    }
  }, []);

  const handleDeleteClick = (id, type) => {
    setSelectedItemId(id);
    setDeleteType(type);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const token = user.token;
      const endpoint =
        deleteType === "event"
          ? `http://localhost:5000/api/event/delete/${selectedItemId}`
          : `http://localhost:5000/api/user/delete/${selectedItemId}`;

      axios
        .delete(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (deleteType === "event") {
            setEvents((prevEvents) =>
              prevEvents.filter((event) => event._id !== selectedItemId)
            );
          } else {
            setUserData((prevUsers) =>
              prevUsers.filter((user) => user._id !== selectedItemId)
            );
          }
          setOpenDeleteDialog(false);
          setSelectedItemId(null);
          setDeleteType(null);
          console.log(`${deleteType} deleted:`, res.data);
        })

        .catch((error) => {
          console.error(`Error deleting ${deleteType}:`, error);
          // Initialize an object to store monthly event counts and attendees
        });
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedItemId(null);
    setDeleteType(null);
  };

  const handleAddUser = () => {};

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#3f51b5" },
      secondary: { main: "#f50057" },
      background: {
        default: darkMode ? "#303030" : "#f5f5f5",
        paper: darkMode ? "#424242" : "#ffffff",
      },
    },
  });

  const renderContent = () => {
    switch (activeTab) {
      case "events":
        return (
          <>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Attendees</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.length > 0 ? (
                    events.map((event) => (
                      <TableRow key={event._id}>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.start_date}</TableCell>
                        <TableCell>
                          {event.participants ? event.participants.length : 0}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              handleDeleteClick(event._id, "event")
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>No events found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        );
      case "users":
        return (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.length > 0 ? (
                  userData.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar sx={{ mr: 2 }}>{user.first_name[0]}</Avatar>
                          {user.first_name}
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteClick(user._id, "user")}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>No users found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        );
      case "analytics":
        // Analytics content remains unchanged
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Event Performance
            </Typography>
            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="events"
                    fill="#8884d8"
                    name="Events"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="attendees"
                    fill="#82ca9d"
                    name="Attendees"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box component="nav" sx={{ width: 240, flexShrink: 0 }}>
          <Paper
            elevation={3}
            sx={{
              height: "100%",
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 0,
            }}
          >
            <List component="nav">
              <ListItem
                button
                selected={activeTab === "events"}
                onClick={() => setActiveTab("events")}
              >
                <EventIcon sx={{ mr: 2 }} />
                <ListItemText primary="Events" />
              </ListItem>
              <ListItem
                button
                selected={activeTab === "users"}
                onClick={() => setActiveTab("users")}
              >
                <PeopleIcon sx={{ mr: 2 }} />
                <ListItemText primary="Users" />
              </ListItem>
              <ListItem
                button
                selected={activeTab === "analytics"}
                onClick={() => setActiveTab("analytics")}
              >
                <AssessmentIcon sx={{ mr: 2 }} />
                <ListItemText primary="Analytics" />
              </ListItem>
            </List>
          </Paper>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </Typography>
            {renderContent()}
          </Container>
        </Box>
      </Box>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this {deleteType}? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
