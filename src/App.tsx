import React from "react"
import "./App.scss"
import { Routes, Route } from "react-router-dom"
import Registration from "./pages/Registration/Registration"
import Chats from "./pages/Chats/Chats"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/GreenAPI-WhatsApp/*" element={<Chats />} />
        <Route
          path="/GreenAPI-WhatsApp/registration"
          element={<Registration />}
        />
      </Routes>
    </div>
  )
}

export default App
