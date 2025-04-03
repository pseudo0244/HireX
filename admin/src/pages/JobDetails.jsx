"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, MapPin, Clock, Briefcase, DollarSign, Edit, Trash2, Share2, Users } from "lucide-react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function JobDetails() {
  const { id } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  // Simulate fetching job data
  useEffect(() => {
    // This would be an API call in a real application
    setTimeout(() => {
      setJob({
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "Remote",
        type: "Full-time",
        salary: "$90,000 - $120,000",
        posted: "2 days ago",
        applicants: 12,
        status: "active",
        description: `
          <p>We are looking for an experienced Frontend Developer to join our team. You will be responsible for building and maintaining our web applications.</p>
          
          <h3>Responsibilities:</h3>
          <ul>
            <li>Develop new user-facing features</li>
            <li>Build reusable code and libraries for future use</li>
            <li>Ensure the technical feasibility of UI/UX designs</li>
            <li>Optimize applications for maximum speed and scalability</li>
            <li>Collaborate with other team members and stakeholders</li>
          </ul>
        `,
        requirements: `
          <h3>Requirements:</h3>
          <ul>
            <li>5+ years of experience with React</li>
            <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model</li>
            <li>Thorough understanding of React.js and its core principles</li>
            <li>Experience with popular React workflows (such as Redux)</li>
            <li>Familiarity with newer specifications of ECMAScript</li>
            <li>Experience with data structure libraries (e.g., Immutable.js)</li>
            <li>Knowledge of isomorphic React is a plus</li>
            <li>Understanding of server-side rendering</li>
          </ul>
        `,
      })
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse">Loading...</div>
            </div>
          </main>
        </div>
      </div>
    )
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

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
              {/* Job header */}
              <div className="border-b p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    <p className="text-lg text-gray-600 mt-1">{job.company}</p>

                    <div className="mt-4 flex flex-wrap gap-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Briefcase className="mr-1.5 h-4 w-4 text-gray-400" />
                        {job.type}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <DollarSign className="mr-1.5 h-4 w-4 text-gray-400" />
                        {job.salary}
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

                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/edit-job/${job.id}`}
                      className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </Link>
                    <button className="inline-flex items-center gap-1 rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                    <Link
                      to={`/job/${job.id}/applicants`}
                      className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <Users className="h-4 w-4" />
                      <span>View Applicants ({job.applicants})</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Job content */}
              <div className="p-6 md:p-8">
                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                  <div dangerouslySetInnerHTML={{ __html: job.description }} />

                  <div className="mt-8" dangerouslySetInnerHTML={{ __html: job.requirements }} />
                </div>

                <div className="mt-8 pt-6 border-t">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Statistics</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border bg-white p-4">
                      <div className="text-sm font-medium text-gray-500">Total Applicants</div>
                      <div className="mt-1 text-2xl font-semibold">{job.applicants}</div>
                    </div>
                    <div className="rounded-lg border bg-white p-4">
                      <div className="text-sm font-medium text-gray-500">Shortlisted</div>
                      <div className="mt-1 text-2xl font-semibold">5</div>
                    </div>
                    <div className="rounded-lg border bg-white p-4">
                      <div className="text-sm font-medium text-gray-500">Interviews Scheduled</div>
                      <div className="mt-1 text-2xl font-semibold">3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

