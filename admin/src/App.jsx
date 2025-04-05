import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import JobDetails from "./pages/JobDetails";
import JobApplicants from "./pages/JobApplicants";
import Resumes from "./pages/Resume";
import ApplicantList from "./pages/ApplicantList";
import ApplicantProfile from "./pages/ApplicantProfile";
import ApplicantComparison from "./pages/ApplicantComparison";
import ScheduleTests from "./pages/ScheduleTests";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/edit-job/:id" element={<EditJob />} />
          <Route path="/resumes" element={<Resumes />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/:id/applicants" element={<JobApplicants />} />
          <Route path="/applicants" element={<ApplicantList />} />
          <Route path="/applicant/:id" element={<ApplicantProfile />} />
          <Route path="/applicants/compare" element={<ApplicantComparison />} />
          <Route path="/schedule-tests" element={<ScheduleTests />} />
        </Routes>
      </div>
    </Router>
  );
}
