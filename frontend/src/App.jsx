import { About } from "./components/AboutPage/About";
import { Contact } from "./components/contactPage/Contact";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import { AddEvent } from "./components/AddEvent";
import { AdminDashboard } from "./components/AdminDashboard";
import Event from "./components/Event/Event";
import { Footer } from "./components/Footer";
import Dashboard from "./components/Dashboard";
import "./App.css";
import EventData from "./components/Event/EventData";
import RegisteredEvent from "./components/RegisteredEvent";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  // const { user } = useAuthContext();
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user) {
      const jsonString = JSON.stringify(user);

      const jwtToken = jwtDecode(jsonString);
      console.log(jwtToken);
      setUserId(jwtToken._id);
      setUserRole(jwtToken.role);

      console.log("Id: ", userId);
      console.log("Role: ", userRole);
    } else {
      <Navigate to="/login" />;
    }
  }, [user]);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route
          path="signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="add-event" element={<AddEvent />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="Event" element={<Event />}>
          <Route path=":eventId" element={<EventData />} />
        </Route>
        <Route path="About" element={<About />} />
        <Route path="Contact" element={<Contact />} />
        <Route
          path="dashboard"
          element={
            user ? (
              userRole === "user" ? (
                <Dashboard />
              ) : (
                <AdminDashboard />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Footer />
      {/* <RegisteredEvent/> */}
    </>
  );
}

export default App;
