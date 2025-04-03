"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  FileText,
  CheckCircle,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function ApplicantProfile() {
  const { id } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [applicant, setApplicant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")

  // Simulate fetching applicant data
  useEffect(() => {
    // This would be an API call in a real application
    setTimeout(() => {
      setApplicant({
        id: 1,
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        experience: "7 years",
        appliedDate: "2023-06-15",
        status: "shortlisted",
        matchScore: 92,
        jobTitle: "Senior Frontend Developer",
        photo: "/placeholder.svg?height=120&width=120",
        resume: "/resume.pdf",
        coverLetter: "/cover-letter.pdf",
        education: [
          {
            degree: "Master of Computer Science",
            institution: "Stanford University",
            year: "2016 - 2018",
          },
          {
            degree: "Bachelor of Computer Science",
            institution: "MIT",
            year: "2012 - 2016",
          },
        ],
        experience: [
          {
            title: "Senior Frontend Developer",
            company: "Tech Solutions Inc.",
            location: "San Francisco, CA",
            period: "2020 - Present",
            description: "Led the development of multiple web applications using React, Redux, and TypeScript.",
          },
          {
            title: "Frontend Developer",
            company: "WebDev Co.",
            location: "New York, NY",
            period: "2018 - 2020",
            description: "Developed responsive web applications and implemented UI/UX designs.",
          },
          {
            title: "Junior Developer",
            company: "StartUp Inc.",
            location: "Boston, MA",
            period: "2016 - 2018",
            description: "Assisted in the development of web applications and fixed bugs.",
          },
        ],
        skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Redux", "Node.js", "GraphQL", "Git", "Agile"],
        languages: ["English (Native)", "Spanish (Intermediate)", "French (Basic)"],
        testResults: [
          {
            name: "JavaScript Proficiency",
            score: 92,
            date: "2023-06-18",
          },
          {
            name: "React Knowledge",
            score: 88,
            date: "2023-06-18",
          },
          {
            name: "Problem Solving",
            score: 85,
            date: "2023-06-18",
          },
        ],
        interviews: [
          {
            type: "Technical Interview",
            date: "2023-06-25",
            time: "10:00 AM",
            interviewer: "Jane Doe",
            status: "scheduled",
          },
        ],
        notes: [
          {
            author: "Jane Doe",
            date: "2023-06-16",
            content: "Strong candidate with excellent technical skills. Recommended for technical interview.",
          },
        ],
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

            {/* Applicant header */}
            <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={applicant.photo || "/placeholder.svg"}
                    alt={applicant.name}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{applicant.name}</h1>
                      <p className="text-lg text-gray-600 mt-1">{applicant.jobTitle}</p>

                      <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="mr-1.5 h-4 w-4 text-gray-400" />
                          {applicant.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="mr-1.5 h-4 w-4 text-gray-400" />
                          {applicant.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                          {applicant.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                          Applied {new Date(applicant.appliedDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {getStatusBadge(applicant.status)}
                        <div className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                          <div className="mr-1 h-2 w-2 rounded-full bg-blue-500"></div>
                          Match: {applicant.matchScore}%
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Download className="h-4 w-4" />
                        <span>Resume</span>
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <MessageCircle className="h-4 w-4" />
                        <span>Message</span>
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700">
                        <CheckCircle className="h-4 w-4" />
                        <span>Shortlist</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === "profile"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("tests")}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === "tests"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Test Results
                </button>
                <button
                  onClick={() => setActiveTab("interviews")}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === "interviews"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Interviews
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === "notes"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Notes
                </button>
              </nav>
            </div>

            {/* Tab content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeTab === "profile" && (
                <>
                  {/* Left column */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Experience */}
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Experience</h2>
                      <div className="space-y-6">
                        {applicant.experience.map((exp, index) => (
                          <div key={index} className="border-l-2 border-gray-200 pl-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <h3 className="text-base font-medium text-gray-900">{exp.title}</h3>
                              <span className="text-sm text-gray-500">{exp.period}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {exp.company}, {exp.location}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
                      <div className="space-y-4">
                        {applicant.education.map((edu, index) => (
                          <div key={index} className="border-l-2 border-gray-200 pl-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <h3 className="text-base font-medium text-gray-900">{edu.degree}</h3>
                              <span className="text-sm text-gray-500">{edu.year}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{edu.institution}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="space-y-6">
                    {/* Skills */}
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {applicant.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Languages</h2>
                      <ul className="space-y-2">
                        {applicant.languages.map((language, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {language}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Documents */}
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm font-medium text-gray-700">Resume.pdf</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                        </div>
                        <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm font-medium text-gray-700">Cover Letter.pdf</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "tests" && (
                <div className="md:col-span-3">
                  <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">Test Results</h2>
                      <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <span>Schedule New Test</span>
                      </button>
                    </div>

                    {applicant.testResults.length > 0 ? (
                      <div className="overflow-hidden rounded-lg border border-gray-200">
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
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Score
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
                            {applicant.testResults.map((test, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                  {test.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {new Date(test.date).toLocaleDateString()}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <div className="flex items-center">
                                    <div
                                      className={`mr-2 h-2.5 w-2.5 rounded-full ${
                                        test.score >= 85
                                          ? "bg-green-500"
                                          : test.score >= 70
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                      }`}
                                    ></div>
                                    <span className="text-sm font-medium">{test.score}%</span>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <button className="text-blue-600 hover:text-blue-900">View Details</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">No test results available.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "interviews" && (
                <div className="md:col-span-3">
                  <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">Interviews</h2>
                      <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <span>Schedule Interview</span>
                      </button>
                    </div>

                    {applicant.interviews.length > 0 ? (
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Interview Type
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Date & Time
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Interviewer
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
                            {applicant.interviews.map((interview, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                  {interview.type}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {new Date(interview.date).toLocaleDateString()} at {interview.time}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {interview.interviewer}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                  <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
                                    {interview.status}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                  <button className="text-red-600 hover:text-red-900">Cancel</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">No interviews scheduled.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "notes" && (
                <div className="md:col-span-3">
                  <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
                      <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <span>Add Note</span>
                      </button>
                    </div>

                    {applicant.notes.length > 0 ? (
                      <div className="space-y-4">
                        {applicant.notes.map((note, index) => (
                          <div key={index} className="rounded-lg border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{note.author}</p>
                                <p className="text-xs text-gray-500">{new Date(note.date).toLocaleDateString()}</p>
                              </div>
                              <button className="text-gray-400 hover:text-gray-500">
                                <MoreHorizontal className="h-5 w-5" />
                              </button>
                            </div>
                            <p className="text-sm text-gray-600">{note.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">No notes available.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

