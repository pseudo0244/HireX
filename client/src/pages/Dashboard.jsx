"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"; // Use environment variable

  // 📌 Fetch Jobs from MongoDB Atlas (Updated Every 5 Seconds)
  useEffect(() => {
    const fetchJobs = () => {
      axios
        .get(`${API_URL}/api/jobs`)
        .then((response) => {
          setJobs(response.data);
        })
        .catch((error) => {
          console.error("❌ Error fetching jobs:", error);
        });
    };

    fetchJobs(); // Fetch initially
    const interval = setInterval(fetchJobs, 5000); // Auto-refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [API_URL]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">Job Listings</h1>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              {jobs.length === 0 ? (
                <p className="text-gray-500">No jobs available.</p>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job._id} className="border p-4 rounded-lg shadow-sm bg-white">
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <p className="text-gray-600">{job.company} - {job.location}</p>
                      <p className="text-gray-700">{job.salary}</p>
                      <p className="text-sm text-gray-500 mt-2">{job.description}</p>
                      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
