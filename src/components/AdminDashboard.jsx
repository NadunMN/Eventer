import  { useState } from "react";
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
} from "@mui/material";
import {
  Event as EventIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
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

// Mock data (same as before)
const events = [
  { id: 1, name: "Tech Conference 2024", date: "2024-09-15", attendees: 500 },
  { id: 2, name: "Music Festival", date: "2024-07-20", attendees: 1000 },
  { id: 3, name: "Food Expo", date: "2024-08-10", attendees: 750 },
];

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Organizer" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Participant" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Admin" },
];

const analyticsData = [
  { name: "Jan", events: 4, attendees: 600 },
  { name: "Feb", events: 3, attendees: 450 },
  { name: "Mar", events: 5, attendees: 800 },
  { name: "Apr", events: 6, attendees: 950 },
];

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
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
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.attendees}</TableCell>
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
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ mr: 2 }}>{user.name[0]}</Avatar>
                        {user.name}
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" color="primary">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      case "analytics":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Event Performance
            </Typography>
            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={analyticsData}>
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
              mt: 8,
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
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </Typography>
            {renderContent()}
          </Container>
        </Box>
      </Box>
    </ThemeProvider> 
  );
};
