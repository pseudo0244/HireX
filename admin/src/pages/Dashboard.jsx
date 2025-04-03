import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/jobs');
        // Ensure jobs is always an array
        setJobs(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
        setError("Failed to load jobs. Please try again later.");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    const interval = setInterval(fetchJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`/api/delete-job/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("❌ Error deleting job:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Job Listings</h2>
              {loading ? (
                <div className="text-gray-500">Loading jobs...</div>
              ) : error ? (
                <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
              ) : jobs.length === 0 ? (
                <p className="text-gray-500">No jobs available.</p>
              ) : (
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">Title</th>
                      <th className="border px-4 py-2">Company</th>
                      <th className="border px-4 py-2">Location</th>
                      <th className="border px-4 py-2">Salary</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job._id} className="border">
                        <td className="border px-4 py-2">{job.title}</td>
                        <td className="border px-4 py-2">{job.company}</td>
                        <td className="border px-4 py-2">{job.location}</td>
                        <td className="border px-4 py-2">{job.salary}</td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => deleteJob(job._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4 inline-block mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;