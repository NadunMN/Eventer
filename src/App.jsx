import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { NavBar } from "./components/NavBar"
import { Route, Routes } from "react-router-dom"
import { Register } from "./components/Register"
import { AddEvent } from "./components/AddEvent"
import { AdminDashboard } from "./components/AdminDashboard"

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
      </Routes>
   </>

  )
}

export default App
