import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, MapPin, Briefcase } from "lucide-react";
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
          <div className="mx-auto max-w-6xl">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            {loading ? (
              <div className="text-gray-500">Loading jobs...</div>
            ) : error ? (
              <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
            ) : jobs.length === 0 ? (
              <p className="text-gray-500">No jobs available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <div key={job._id} className="bg-white rounded-xl shadow-md p-5 border flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                      <p className="text-gray-600 flex items-center mt-2">
                        <Briefcase className="h-4 w-4 mr-2 text-blue-500" /> {job.company}
                      </p>
                      <p className="text-gray-600 flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-2 text-green-500" /> {job.location}
                      </p>
                      <p className="mt-3 text-gray-500 text-sm">{job.description.slice(0, 100)}...</p>
                      <p className="mt-2 font-semibold text-blue-600">Salary: {job.salary || "Not specified"}</p>
                    </div>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
                    >
                      <Trash2 className="h-5 w-5 mr-2" /> Delete Job
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
