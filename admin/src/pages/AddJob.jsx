import React from "react";
import { useState } from "react";

export default function AddJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Added:", { title, company, location });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Add Job</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg mb-3"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg mb-3"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg mb-3"
          />
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}
