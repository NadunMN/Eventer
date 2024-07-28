import { Home } from "./components/Home"
import { LoginPage } from "./components/LoginPage"
import { NavBar } from "./components/NavBar"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
