import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-job" element={<AddJob />} />
        </Routes>
      </div>
    </Router>
  );
}
