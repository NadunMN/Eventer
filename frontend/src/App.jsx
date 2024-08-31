import { About } from "./components/AboutPage/About";
import { Contact } from "./components/contactPage/Contact";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { Register } from "./components/Register";
import { AddEvent } from "./components/AddEvent";
import { AdminDashboard } from "./components/AdminDashboard";
import Event from "./components/Event/Event";
import { Footer } from "./components/Footer";
import Dashboard from "./components/Dashboard";
import "./App.css";
import EventData from "./components/Event/EventData";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="add-event" element={<AddEvent />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="Event" element={<Event />}>
          <Route path=":Id" element={<EventData />} />
        </Route>
        <Route path="About" element={<About />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="user-dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
