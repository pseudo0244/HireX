"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Briefcase, CheckSquare, User, Clock, MapPin, MoreVertical, Trash2, FileSearch } from "lucide-react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [jobs, setJobs] = useState([])
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplicants: 0,
    avgApplications: 0,
  })

  // Sample job data - will be merged with localStorage data
  const sampleJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      posted: "2 days ago",
      applicants: 12,
      status: "active",
      description: "Build and maintain responsive user interfaces using React.",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignHub",
      location: "New York, NY",
      type: "Full-time",
      salary: "$80,000 - $100,000",
      posted: "1 week ago",
      applicants: 8,
      status: "active",
      description: "Design intuitive interfaces and user experiences.",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "ServerStack",
      location: "San Francisco, CA",
      type: "Contract",
      salary: "$70 - $90 per hour",
      posted: "3 days ago",
      applicants: 5,
      status: "active",
      description: "Work on APIs, databases, and server-side logic.",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "ProductLabs",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      posted: "5 days ago",
      applicants: 15,
      status: "active",
      description: "Lead product development and strategy.",
    },
  ]

  const loadJobs = () => {
    // Load jobs from localStorage
    const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]")

    // Combine stored jobs with sample jobs
    // Using a Map to ensure no duplicate IDs
    const jobMap = new Map()

    // Add sample jobs to map
    sampleJobs.forEach((job) => {
      jobMap.set(job.id, job)
    })

    // Add stored jobs to map (will overwrite sample jobs with same ID)
    storedJobs.forEach((job) => {
      jobMap.set(job.id, job)
    })

    // Convert map back to array and sort by newest first
    const allJobs = Array.from(jobMap.values()).sort((a, b) => {
      // If it's a stored job with a timestamp ID, it's newer
      if (typeof a.id === "number" && a.id > 1000000000 && typeof b.id === "number" && b.id > 1000000000) {
        return b.id - a.id
      }
      // Otherwise use the sample order
      return 0
    })

    setJobs(allJobs)

    // Calculate stats
    const activeJobs = allJobs.filter((job) => job.status === "active").length
    const totalApplicants = allJobs.reduce((sum, job) => sum + job.applicants, 0)
    const avgApplications = allJobs.length > 0 ? Math.round(totalApplicants / allJobs.length) : 0

    setStats({
      totalJobs: allJobs.length,
      activeJobs,
      totalApplicants,
      avgApplications,
    })
  }

  useEffect(() => {
    loadJobs()
  }, [])

  const handleDeleteJob = (jobId) => {
    // Get current jobs from localStorage
    const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]")

    // Filter out the job to delete
    const updatedJobs = storedJobs.filter((job) => job.id !== jobId)

    // Save back to localStorage
    localStorage.setItem("jobs", JSON.stringify(updatedJobs))

    // Reload jobs to update the UI
    loadJobs()
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, here's what's happening with your job postings.</p>
          </div>

          {/* Stats cards */}
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Total Jobs</h3>
                <div className="rounded-full bg-blue-100 p-2">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
              <p className="mt-1 text-xs text-green-600">↑ 8% from last month</p>
            </div>

            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Active Jobs</h3>
                <div className="rounded-full bg-green-100 p-2">
                  <CheckSquare className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
              <p className="mt-1 text-xs text-green-600">↑ 12% from last month</p>
            </div>

            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Total Applicants</h3>
                <div className="rounded-full bg-purple-100 p-2">
                  <User className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalApplicants}</p>
              <p className="mt-1 text-xs text-green-600">↑ 24% from last month</p>
            </div>

            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Avg. Applications</h3>
                <div className="rounded-full bg-yellow-100 p-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.avgApplications}</p>
              <p className="mt-1 text-xs text-red-600">↓ 3% from last month</p>
            </div>
          </div>

          {/* AI Resume Screening Button */}
          <div className="mb-8">
          <a
  href="http://192.168.0.117:8501"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
>
  <FileSearch className="h-5 w-5" />
  AI Resume Screening
</a>

          </div>

          {/* Job listings */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Job Postings</h2>
              <a href="/jobs" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View all
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="p-5">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="rounded-md p-1 text-red-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
                        Posted {job.posted}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        {job.type}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        {job.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t bg-gray-50 px-5 py-3">
                    <span className="text-sm font-medium text-gray-700">{job.applicants} applicants</span>
                    <div className="flex gap-2">
                      <a href={`/job/${job.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        View details
                      </a>
                      <a
                        href={`/job/${job.id}/applicants`}
                        className="text-sm font-medium text-green-600 hover:text-green-800"
                      >
                        View Applicants
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

