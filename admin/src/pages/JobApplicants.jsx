"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ChevronDown, Search, Filter, Download, MoreHorizontal } from "lucide-react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function JobApplicants() {
  const { id } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [job, setJob] = useState(null)
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState("all")

  // Simulate fetching job and applicant data
  useEffect(() => {
    // This would be API calls in a real application
    setTimeout(() => {
      setJob({
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
      })

      setApplicants([
        {
          id: 1,
          name: "John Smith",
          email: "john.smith@example.com",
          location: "New York, NY",
          experience: "7 years",
          appliedDate: "2023-06-15",
          status: "shortlisted",
          matchScore: 92,
          photo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 2,
          name: "Emily Johnson",
          email: "emily.johnson@example.com",
          location: "San Francisco, CA",
          experience: "5 years",
          appliedDate: "2023-06-14",
          status: "reviewing",
          matchScore: 85,
          photo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 3,
          name: "Michael Brown",
          email: "michael.brown@example.com",
          location: "Chicago, IL",
          experience: "3 years",
          appliedDate: "2023-06-12",
          status: "rejected",
          matchScore: 65,
          photo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 4,
          name: "Sarah Davis",
          email: "sarah.davis@example.com",
          location: "Remote",
          experience: "8 years",
          appliedDate: "2023-06-10",
          status: "interviewing",
          matchScore: 88,
          photo: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 5,
          name: "David Wilson",
          email: "david.wilson@example.com",
          location: "Boston, MA",
          experience: "6 years",
          appliedDate: "2023-06-09",
          status: "shortlisted",
          matchScore: 90,
          photo: "/placeholder.svg?height=40&width=40",
        },
      ])

      setLoading(false)
    }, 500)
  }, [id])

  const filteredApplicants = applicants.filter((applicant) => {
    if (filterStatus === "all") return true
    return applicant.status === filterStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "shortlisted":
        return (
          <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
            Shortlisted
          </span>
        )
      case "reviewing":
        return (
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            Reviewing
          </span>
        )
      case "interviewing":
        return (
          <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
            Interviewing
          </span>
        )
      case "rejected":
        return (
          <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
            Rejected
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            New
          </span>
        )
    }
  }

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
          <div className="mx-auto max-w-6xl">
            <div className="mb-6">
              <Link
                to={`/job/${id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Job Details
              </Link>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Applicants for {job.title}</h1>
              <p className="text-gray-600 mt-1">{job.company}</p>
            </div>

            {/* Filters and actions */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                <select
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="rejected">Rejected</option>
                </select>

                <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applicants..."
                  className="w-full sm:w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Applicants table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Applicant
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Experience
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Applied
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Match
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredApplicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={applicant.photo || "/placeholder.svg"}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{applicant.name}</div>
                            <div className="text-sm text-gray-500">{applicant.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{applicant.location}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{applicant.experience}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {new Date(applicant.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div
                            className={`mr-2 h-2.5 w-2.5 rounded-full ${
                              applicant.matchScore >= 85
                                ? "bg-green-500"
                                : applicant.matchScore >= 70
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          ></div>
                          <span className="text-sm font-medium">{applicant.matchScore}%</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">{getStatusBadge(applicant.status)}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link to={`/applicant/${applicant.id}`} className="text-blue-600 hover:text-blue-900">
                            View
                          </Link>
                          <button className="text-gray-500 hover:text-gray-700">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredApplicants.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No applicants found matching the selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

