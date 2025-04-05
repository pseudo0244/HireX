import React, { useState } from "react";

export default function JobApplicationModal({ job, isOpen, onClose, onApply }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    experience: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, resume: file });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.resume) {
      alert("Please fill all fields and upload a resume.");
      return;
    }

    // Create application object
    const application = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      location: formData.location,
      experience: formData.experience,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "reviewing",
      matchScore: Math.floor(Math.random() * 100), // Random match score
      jobTitle: job.title,
      resume: URL.createObjectURL(formData.resume),
    };

    // Save to localStorage
    const storedApplications = JSON.parse(localStorage.getItem("applications")) || [];
    storedApplications.push(application);
    localStorage.setItem("applications", JSON.stringify(storedApplications));

    alert("Application submitted successfully!");
    onApply();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Apply for {job.title}
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="text"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleChange}
          className="mb-2 w-full rounded border p-2"
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="mb-4 w-full"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2">Cancel</button>
          <button onClick={handleSubmit} className="rounded bg-blue-600 px-4 py-2 text-white">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
