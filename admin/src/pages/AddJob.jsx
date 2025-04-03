"use client"
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function AddJob() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Job Added:", formData)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm md:p-8">
              <h1 className="mb-6 text-2xl font-bold text-gray-900">Add New Job</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="e.g. Senior Frontend Developer"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name*
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location*
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="e.g. Remote, New York, etc."
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                        Job Type*
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select job type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                        Salary Range
                      </label>
                      <input
                        type="text"
                        id="salary"
                        name="salary"
                        placeholder="e.g. $80,000 - $100,000"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Describe the job role, responsibilities, and requirements"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                      Requirements*
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      placeholder="List the key requirements for this position"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Link
                    to="/dashboard"
                    className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Publish Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

