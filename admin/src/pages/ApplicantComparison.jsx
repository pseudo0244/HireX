"use client"
import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Search, X, Download } from "lucide-react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function ApplicantComparison() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [applicants, setApplicants] = useState([])
  const [selectedApplicants, setSelectedApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Simulate fetching applicant data
  useEffect(() => {
    // This would be an API call in a real application
    setTimeout(() => {
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
          jobTitle: "Senior Frontend Developer",
          photo: "/placeholder.svg?height=40&width=40",
          skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Redux", "Node.js", "GraphQL"],
          education: "Master of Computer Science, Stanford University",
          testScores: {
            technical: 92,
            problemSolving: 88,
            communication: 85,
          },
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
          jobTitle: "UX/UI Designer",
          photo: "/placeholder.svg?height=40&width=40",
          skills: ["UI Design", "UX Research", "Figma", "Adobe XD", "Sketch", "HTML", "CSS", "Prototyping"],
          education: "Bachelor of Fine Arts, Rhode Island School of Design",
          testScores: {
            technical: 78,
            problemSolving: 90,
            communication: 95,
          },
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
          jobTitle: "Backend Developer",
          photo: "/placeholder.svg?height=40&width=40",
          skills: ["Java", "Spring Boot", "SQL", "MongoDB", "Docker", "Kubernetes", "AWS"],
          education: "Bachelor of Computer Science, University of Illinois",
          testScores: {
            technical: 75,
            problemSolving: 68,
            communication: 72,
          },
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
          jobTitle: "Product Manager",
          photo: "/placeholder.svg?height=40&width=40",
          skills: ["Product Strategy", "Agile", "Scrum", "User Research", "Analytics", "Roadmapping"],
          education: "MBA, Harvard Business School",
          testScores: {
            technical: 82,
            problemSolving: 94,
            communication: 90,
          },
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
          jobTitle: "Senior Frontend Developer",
          photo: "/placeholder.svg?height=40&width=40",
          skills: ["React", "Vue.js", "Angular", "JavaScript", "TypeScript", "CSS", "Webpack"],
          education: "Bachelor of Computer Science, MIT",
          testScores: {
            technical: 95,
            problemSolving: 85,
            communication: 80,
          },
        },
      ])

      setLoading(false)
    }, 500)
  }, [])

  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectApplicant = (applicant) => {
    if (selectedApplicants.length < 3 && !selectedApplicants.some((a) => a.id === applicant.id)) {
      setSelectedApplicants([...selectedApplicants, applicant])
    }
  }

  const handleRemoveApplicant = (applicantId) => {
    setSelectedApplicants(selectedApplicants.filter((a) => a.id !== applicantId))
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
                to="/applicants"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Applicants
              </Link>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Compare Applicants</h1>
              <p className="text-gray-600 mt-1">Select up to 3 applicants to compare side by side</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - Applicant selection */}
              <div className="md:col-span-1">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Applicants</h2>

                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search applicants..."
                        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {filteredApplicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className={`flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-gray-50 ${
                          selectedApplicants.some((a) => a.id === applicant.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200"
                        }`}
                        onClick={() => handleSelectApplicant(applicant)}
                      >
                        <div className="flex items-center">
                          <img
                            src={applicant.photo || "/placeholder.svg"}
                            alt={applicant.name}
                            className="h-10 w-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{applicant.name}</p>
                            <p className="text-xs text-gray-500">{applicant.jobTitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`h-2.5 w-2.5 rounded-full mr-2 ${
                              applicant.matchScore >= 85
                                ? "bg-green-500"
                                : applicant.matchScore >= 70
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          ></div>
                          <span className="text-xs font-medium">{applicant.matchScore}%</span>
                        </div>
                      </div>
                    ))}

                    {filteredApplicants.length === 0 && (
                      <div className="py-4 text-center">
                        <p className="text-gray-500">No applicants found matching your search.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right column - Comparison */}
              <div className="md:col-span-2">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Comparison</h2>

                  {selectedApplicants.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">Select applicants to compare them side by side.</p>
                    </div>
                  ) : (
                    <>
                      {/* Selected applicants */}
                      <div className="mb-6 flex flex-wrap gap-2">
                        {selectedApplicants.map((applicant) => (
                          <div
                            key={applicant.id}
                            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                          >
                            {applicant.name}
                            <button
                              onClick={() => handleRemoveApplicant(applicant.id)}
                              className="rounded-full hover:bg-blue-100"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Comparison table */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 w-1/4">
                                Criteria
                              </th>
                              {selectedApplicants.map((applicant) => (
                                <th
                                  key={applicant.id}
                                  className="py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                  {applicant.name}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {/* Match Score */}
                            <tr>
                              <td className="py-4 text-sm font-medium text-gray-900">Match Score</td>
                              {selectedApplicants.map((applicant) => (
                                <td key={applicant.id} className="py-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <div
                                      className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                        applicant.matchScore >= 85
                                          ? "bg-green-500"
                                          : applicant.matchScore >= 70
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                      }`}
                                    ></div>
                                    <span className="font-medium">{applicant.matchScore}%</span>
                                  </div>
                                </td>
                              ))}
                            </tr>

                            {/* Experience */}
                            <tr>
                              <td className="py-4 text-sm font-medium text-gray-900">Experience</td>
                              {selectedApplicants.map((applicant) => (
                                <td key={applicant.id} className="py-4 text-sm text-gray-500">
                                  {applicant.experience}
                                </td>
                              ))}
                            </tr>

                            {/* Location */}
                            <tr>
                              <td className="py-4 text-sm font-medium text-gray-900">Location</td>
                              {selectedApplicants.map((applicant) => (
                                <td key={applicant.id} className="py-4 text-sm text-gray-500">
                                  {applicant.location}
                                </td>
                              ))}
                            </tr>

                            {/* Education */}
                            <tr>
                              <td className="py-4 text-sm font-medium text-gray-900">Education</td>
                              {selectedApplicants.map((applicant) => (
                                <td key={applicant.id} className="py-4 text-sm text-gray-500">
                                  {applicant.education}
                                </td>
                              ))}
                            </tr>

                            {/* Skills */}
                            <tr>
                              <td className="py-4 text-sm font-medium text-gray-900">Skills</td>
                              {selectedApplicants.map((applicant) => (
                                <td key={applicant.id} className="py-4 text-sm text-gray-500">
                                  <div className="flex flex-wrap gap-1">
                                    {applicant.skills.slice(0, 5).map((skill, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                    {applicant.skills.length > 5 && (
                                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700">
                                        +{applicant.skills.length - 5} more
                                      </span>
                                    )}
                                  </div>
                                </td>
                              ))}
                            </tr>

                            {/* Technical Score */}
                            <tr>
                              <td className="py-4 text-sm font-medium text-gray-900">Technical Score</td>
                              {selectedApplicants.map((applicant) => (
                                <td key={applicant.id} className="py-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <div
                                      className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                        applicant.testScores.technical >= 85
                                          ? "bg-green-500"
                                          : applicant.testScores.technical >= 70
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                      }`}
                                    ></div>
                                    <span className="font-medium">{applicant.testScores.technical}%</span>
                                  </div>
                                </td>
                              ))}
                            </tr>

                            {/* Problem Solving */}
                            <tr>
                              <td className="py-4 text-sm font-medium text-gray-900">Problem Solving</td>
                              {selectedApplicants.map((applicant) => (
                                <td key={applicant.id} className="py-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <div
                                      className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                        applicant.testScores.problemSolving >= 85
                                          ? "bg-green-500"
                                          : applicant.testScores.problemSolving >= 70
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                      }`}
                                    ></div>
                                    <span className="font-medium">{applicant.testScores.problemSolving}%</span>
                                  </div>
                                </td>
                              ))}
                            </tr>

                            {/* Communication */}
                            <tr>
                              <td className="py-4 text-sm font-medium text-gray-900">Communication</td>
                              {selectedApplicants.map((applicant) => (
                                <td key={applicant.id} className="py-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <div
                                      className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                        applicant.testScores.communication >= 85
                                          ? "bg-green-500"
                                          : applicant.testScores.communication >= 70
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                      }`}
                                    ></div>
                                    <span className="font-medium">{applicant.testScores.communication}%</span>
                                  </div>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex justify-end gap-3">
                        <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                          <Download className="h-4 w-4" />
                          <span>Export Comparison</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

