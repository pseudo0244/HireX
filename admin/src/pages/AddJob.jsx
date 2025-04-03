import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AddJob() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.title || !formData.company || !formData.location || !formData.type || !formData.description || !formData.requirements) {
      setMessage("❌ Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/add-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Job added successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage(`❌ Failed to add job: ${data.message || "Server error"}`);
      }
    } catch (error) {
      setMessage("❌ Error connecting to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6">
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm md:p-8">
              <h1 className="mb-6 text-2xl font-bold text-gray-900">Add New Job</h1>
              {message && (
                <div className={`p-3 rounded-md ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:ring-1" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:ring-1" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:ring-1" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:ring-1" required>
                      <option value="">Select job type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                    <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:ring-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:ring-1" required></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requirements*</label>
                    <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows="4" className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:ring-1" required></textarea>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Link to="/dashboard" className="rounded-lg border px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50">Cancel</Link>
                  <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm text-white hover:bg-blue-700" disabled={loading}>
                    {loading ? "Publishing..." : "Publish Job"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddJob;