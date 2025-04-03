"use client"
import React from "react"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, Filter, Calendar, Clock, Users, FileText, Edit, Trash2, MoreHorizontal } from "lucide-react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function ScheduleTests() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("upcoming")

  // Simulate fetching test data
  useEffect(() => {
    // This would be an API call in a real application
    setTimeout(() => {
      setTests([
        {
          id: 1,
          title: "JavaScript Proficiency Test",
          description: "Assess JavaScript knowledge including ES6+ features, async programming, and DOM manipulation.",
          type: "Technical",
          duration: "60 minutes",
          questions: 25,
          scheduled: "2023-07-15",
          time: "10:00 AM",
          candidates: 8,
          status: "upcoming",
        },
        {
          id: 2,
          title: "React Development Skills",
          description: "Test React knowledge including hooks, context API, and component lifecycle.",
          type: "Technical",
          duration: "45 minutes",
          questions: 20,
          scheduled: "2023-07-18",
          time: "2:00 PM",
          candidates: 5,
          status: "upcoming",
        },
        {
          id: 3,
          title: "Problem Solving Assessment",
          description: "Evaluate algorithmic thinking and problem-solving abilities.",
          type: "Logical",
          duration: "90 minutes",
          questions: 15,
          scheduled: "2023-07-10",
          time: "11:00 AM",
          candidates: 12,
          status: "completed",
          completedBy: 10,
        },
        {
          id: 4,
          title: "System Design Interview",
          description: "Assess ability to design scalable systems and architecture.",
          type: "Technical",
          duration: "60 minutes",
          questions: 5,
          scheduled: "2023-07-05",
          time: "3:00 PM",
          candidates: 4,
          status: "completed",
          completedBy: 4,
        },
        {
          id: 5,
          title: "Communication Skills",
          description: "Evaluate written and verbal communication abilities.",
          type: "Soft Skills",
          duration: "30 minutes",
          questions: 10,
          scheduled: "2023-07-20",
          time: "1:00 PM",
          candidates: 15,
          status: "draft",
        },
      ])

      setLoading(false)
    }, 500)
  }, [])

  const filteredTests = tests.filter((test) => {
    if (activeTab === "all") return true
    return test.status === activeTab
  })

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
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Schedule Tests</h1>
                <p className="text-gray-600 mt-1">Create and manage assessment tests for candidates</p>
              </div>
              <Link
                to="/create-test"
                className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                <span>Create New Test</span>
              </Link>
            </div>

            {/* Stats cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">Total Tests</h3>
                  <div className="rounded-full bg-blue-100 p-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">{tests.length}</p>
                <p className="mt-1 text-xs text-green-600">↑ 12% from last month</p>
              </div>

              <div className="rounded-lg border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">Upcoming Tests</h3>
                  <div className="rounded-full bg-green-100 p-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {tests.filter((test) => test.status === "upcoming").length}
                </p>
                <p className="mt-1 text-xs text-green-600">↑ 8% from last month</p>
              </div>

              <div className="rounded-lg border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">Candidates Tested</h3>
                  <div className="rounded-full bg-purple-100 p-2">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {tests.filter((test) => test.status === "completed").reduce((acc, test) => acc + test.completedBy, 0)}
                </p>
                <p className="mt-1 text-xs text-green-600">↑ 24% from last month</p>
              </div>

              <div className="rounded-lg border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">Avg. Completion Time</h3>
                  <div className="rounded-full bg-yellow-100 p-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">42m</p>
                <p className="mt-1 text-xs text-red-600">↓ 5% from last month</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === "all"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  All Tests
                </button>
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === "upcoming"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === "completed"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setActiveTab("draft")}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === "draft"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Drafts
                </button>
              </nav>
            </div>

            {/* Filters and search */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                </div>

                <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700">
                  <option value="">All Types</option>
                  <option value="Technical">Technical</option>
                  <option value="Logical">Logical</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tests..."
                  className="w-full sm:w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Tests table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Test Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Schedule
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Candidates
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
                  {filteredTests.map((test) => (
                    <tr key={test.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{test.title}</div>
                          <div className="text-sm text-gray-500">{test.description.substring(0, 60)}...</div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            test.type === "Technical"
                              ? "bg-blue-50 text-blue-700"
                              : test.type === "Logical"
                                ? "bg-purple-50 text-purple-700"
                                : "bg-green-50 text-green-700"
                          }`}
                        >
                          {test.type}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span>{new Date(test.scheduled).toLocaleDateString()}</span>
                          <span className="text-xs text-gray-400">{test.time}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{test.duration}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="mr-1.5 h-4 w-4 text-gray-400" />
                          <span>{test.candidates}</span>
                          {test.status === "completed" && (
                            <span className="ml-1 text-xs text-gray-400">({test.completedBy} completed)</span>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            test.status === "upcoming"
                              ? "bg-green-50 text-green-700"
                              : test.status === "completed"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-gray-50 text-gray-700"
                          }`}
                        >
                          {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredTests.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No tests found matching the selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

