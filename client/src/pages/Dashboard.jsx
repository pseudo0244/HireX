import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Building, FileUp, LogOut, MessageSquare, Search, Settings, User, Home, CheckCircle, Clock, Bell, ChevronRight, Menu, X, Upload, ChevronDown } from 'lucide-react';

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    tags: ["React", "TypeScript", "UI/UX"],
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "InnovateSoft",
    location: "New York, NY",
    salary: "$110,000 - $140,000",
    posted: "1 week ago",
    tags: ["Node.js", "React", "MongoDB"],
  },
  {
    id: 3,
    title: "Product Designer",
    company: "DesignHub",
    location: "Austin, TX (Hybrid)",
    salary: "$90,000 - $120,000",
    posted: "3 days ago",
    tags: ["Figma", "UI/UX", "Prototyping"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Remote",
    salary: "$130,000 - $160,000",
    posted: "Just now",
    tags: ["AWS", "Kubernetes", "CI/CD"],
  },
  {
    id: 5,
    title: "Machine Learning Engineer",
    company: "AI Innovations",
    location: "Seattle, WA",
    salary: "$140,000 - $180,000",
    posted: "5 days ago",
    tags: ["Python", "TensorFlow", "Data Science"],
  },
];

// Mock applied jobs
const mockAppliedJobs = [
  {
    id: 101,
    title: "UX Designer",
    company: "Creative Solutions",
    location: "Chicago, IL",
    appliedDate: "2023-04-01",
    status: "Interview Scheduled",
    statusColor: "text-amber-500",
  },
  {
    id: 102,
    title: "Frontend Developer",
    company: "WebTech Inc.",
    location: "Remote",
    appliedDate: "2023-03-28",
    status: "Application Reviewed",
    statusColor: "text-blue-500",
  },
  {
    id: 103,
    title: "React Native Developer",
    company: "MobileApps Co.",
    location: "Boston, MA",
    appliedDate: "2023-03-15",
    status: "Rejected",
    statusColor: "text-red-500",
  },
];

// Mock interview questions
const mockInterviewQuestions = [
  "Tell me about yourself and your experience in this field.",
  "What are your greatest strengths and weaknesses?",
  "Describe a challenging project you worked on and how you overcame obstacles.",
  "How do you stay updated with the latest trends and technologies in your field?",
  "Where do you see yourself in 5 years?",
];

// Application questions
const applicationQuestions = [
  {
    id: "experience",
    question: "How many years of experience do you have with the required skills?",
    options: [
      { value: "0-1", label: "0-1 years" },
      { value: "1-3", label: "1-3 years" },
      { value: "3-5", label: "3-5 years" },
      { value: "5+", label: "5+ years" },
    ],
  },
  {
    id: "availability",
    question: "When can you start if selected?",
    options: [
      { value: "immediately", label: "Immediately" },
      { value: "2weeks", label: "In 2 weeks" },
      { value: "1month", label: "In 1 month" },
      { value: "other", label: "Other (specify in cover letter)" },
    ],
  },
  {
    id: "remote",
    question: "Are you comfortable working remotely?",
    options: [
      { value: "yes", label: "Yes, fully remote" },
      { value: "hybrid", label: "Prefer hybrid" },
      { value: "no", label: "Prefer office" },
    ],
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationStep, setApplicationStep] = useState(1);
  const [applicationAnswers, setApplicationAnswers] = useState({});
  const [coverLetter, setCoverLetter] = useState("");

  const filteredJobs = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleNextQuestion = () => {
    if (activeQuestion < mockInterviewQuestions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setAnswer("");
    }
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsApplyDialogOpen(true);
    setApplicationStep(1);
    setApplicationAnswers({});
    setCoverLetter("");
    setSelectedFile(null);
  };

  const handleApplicationQuestionChange = (questionId, value) => {
    setApplicationAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNextStep = () => {
    setApplicationStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setApplicationStep((prev) => prev - 1);
  };

  const handleSubmitApplication = () => {
    // Here you would submit the application data to your backend
    console.log({
      job: selectedJob,
      answers: applicationAnswers,
      coverLetter,
      resume: selectedFile,
    });

    // Close dialog and show success message
    setIsApplyDialogOpen(false);
    // You could show a toast notification here
  };

  const isQuestionStepComplete = applicationQuestions.every((q) => applicationAnswers[q.id]);
  const isResumeStepComplete = !!selectedFile;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r shadow-sm transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className="border-b p-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-blue-600">Recruit</span>
            <span>AI</span>
          </Link>
          <button 
            className="absolute right-4 top-4 md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Sidebar Content */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-8rem)]">
          <ul className="space-y-2">
            <li>
              <button
                className={`flex items-center w-full gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "jobs" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
                onClick={() => setActiveTab("jobs")}
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "applied" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
                onClick={() => setActiveTab("applied")}
              >
                <CheckCircle className="h-4 w-4" />
                <span>Applied Jobs</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "saved" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
                onClick={() => setActiveTab("saved")}
              >
                <Clock className="h-4 w-4" />
                <span>Saved Jobs</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "interview" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
                onClick={() => setActiveTab("interview")}
              >
                <MessageSquare className="h-4 w-4" />
                <span>AI Interview</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "resume" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
                onClick={() => setActiveTab("resume")}
              >
                <FileUp className="h-4 w-4" />
                <span>Resume</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "settings" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </div>
        
        {/* Sidebar Footer */}
        <div className="border-t p-4 absolute bottom-0 w-full bg-white">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex h-16 items-center px-4 gap-4">
            <button 
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="ml-auto flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold">Job Listings</h1>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 md:w-auto">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      className="pl-10 pr-4 py-2 w-full md:w-[300px] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="px-3 py-2 border rounded-md hover:bg-gray-50 text-sm">
                    Filter
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">{job.title}</h3>
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <Briefcase className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Building className="h-3 w-3" />
                        {job.company}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Location:</span>
                          <span>{job.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Salary:</span>
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Posted:</span>
                          <span>{job.posted}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t">
                      <button 
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => handleApplyClick(job)}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applied Jobs Tab */}
          {activeTab === "applied" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Applied Jobs</h1>

              <div className="space-y-4">
                {mockAppliedJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
                      <div className="space-y-1">
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-500">
                          {job.company} • {job.location}
                        </p>
                        <p className="text-xs">Applied on {new Date(job.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-sm font-medium ${job.statusColor}`}>{job.status}</span>
                        <button className="p-1 rounded-md hover:bg-gray-100">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Interview Tab */}
          {activeTab === "interview" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">AI Interview Practice</h1>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-medium">Practice Interview Questions</h2>
                  <p className="text-sm text-gray-500">Practice answering common interview questions with AI feedback</p>
                </div>
                <div className="p-4 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">
                          Question {activeQuestion + 1} of {mockInterviewQuestions.length}
                        </p>
                        <p>{mockInterviewQuestions[activeQuestion]}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="answer" className="block text-sm font-medium">Your Answer</label>
                    <textarea
                      id="answer"
                      placeholder="Type your answer here..."
                      rows={6}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button 
                      className={`px-3 py-2 border rounded-md hover:bg-gray-50 transition-colors ${activeQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={activeQuestion === 0}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      className={`px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${!answer.trim() || activeQuestion === mockInterviewQuestions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!answer.trim() || activeQuestion === mockInterviewQuestions.length - 1}
                    >
                      Next Question
                    </button>
                    <button 
                      className={`px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${!answer.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!answer.trim()}
                    >
                      Get AI Feedback
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-medium">Interview Performance</h2>
                  <p className="text-sm text-gray-500">Track your progress and see how you're improving</p>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Communication Skills</span>
                        <span className="text-sm">8/10</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Technical Knowledge</span>
                        <span className="text-sm">7/10</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Problem Solving</span>
                        <span className="text-sm">9/10</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resume Tab */}
          {activeTab === "resume" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Resume Management</h1>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-medium">Resume Upload</h2>
                  <p className="text-sm text-gray-500">Upload your resume to apply for jobs and get AI-powered feedback</p>
                </div>
                <div className="p-4 space-y-4">
                  <div className="border-2 border-dashed rounded-md p-8 text-center">
                    <FileUp className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                    <div className="space-y-2">
                      <p>Drag and drop your resume here, or click to browse</p>
                      <p className="text-sm text-gray-500">Supports PDF, DOCX, up to 5MB</p>
                      <div className="relative">
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept=".pdf,.docx"
                          onChange={handleFileChange}
                        />
                        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                          Browse Files
                        </button>
                      </div>
                      {selectedFile && (
                        <div className="mt-4 text-sm">
                          Selected: <span className="font-medium">{selectedFile.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    className={`w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${!selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!selectedFile}
                  >
                    Upload Resume
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-medium">Resume Analysis</h2>
                  <p className="text-sm text-gray-500">Our AI will analyze your resume and provide feedback</p>
                </div>
                <div className="p-4">
                  <div className="text-center py-8">
                    <p className="text-gray-500">Upload your resume to get an AI-powered analysis</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Job Application Dialog */}
      {isApplyDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-medium">Apply for {selectedJob?.title}</h2>
                <p className="text-sm text-gray-500">
                  {selectedJob?.company} • {selectedJob?.location}
                </p>
              </div>
              <button onClick={() => setIsApplyDialogOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-medium">Application Progress</span>
                  <span className="text-xs">{applicationStep}/3</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300" 
                    style={{ width: `${applicationStep * 33.33}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Questions */}
              {applicationStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Screening Questions</h3>

                  {applicationQuestions.map((q) => (
                    <div key={q.id} className="space-y-3">
                      <label className="block text-sm font-medium">{q.question}</label>
                      <div className="space-y-2">
                        {q.options.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={`${q.id}-${option.value}`}
                              name={q.id}
                              value={option.value}
                              checked={applicationAnswers[q.id] === option.value}
                              onChange={() => handleApplicationQuestionChange(q.id, option.value)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={`${q.id}-${option.value}`} className="text-sm">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Resume */}
              {applicationStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Upload Resume</h3>

                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                    <div className="space-y-2">
                      <p>Drag and drop your resume here, or click to browse</p>
                      <p className="text-sm text-gray-500">Supports PDF, DOCX, up to 5MB</p>
                      <div className="relative">
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept=".pdf,.docx"
                          onChange={handleFileChange}
                        />
                        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                          Browse Files
                        </button>
                      </div>
                      {selectedFile && (
                        <div className="mt-4 text-sm">
                          Selected: <span className="font-medium">{selectedFile.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="cover-letter" className="block text-sm font-medium">
                      Cover Letter (Optional)
                    </label>
                    <textarea
                      id="cover-letter"
                      placeholder="Write a brief cover letter..."
                      rows={6}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {applicationStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Review Application</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Screening Questions</h4>
                      {applicationQuestions.map((q) => (
                        <div key={q.id} className="mb-2">
                          <p className="text-sm font-medium">{q.question}</p>
                          <p className="text-sm">
                            {q.options.find((o) => o.value === applicationAnswers[q.id])?.label || "Not answered"}
                          </p>
                        </div>
                      ))}
                    </div>

                    <hr className="border-t border-gray-200" />

                    <div>
                      <h4 className="text-sm font-medium mb-2">Resume</h4>
                      {selectedFile ? (
                        <p className="text-sm">{selectedFile.name}</p>
                      ) : (
                        <p className="text-sm text-gray-500">No resume uploaded</p>
                      )}
                    </div>

                    {coverLetter && (
                      <>
                        <hr className="border-t border-gray-200" />
                        <div>
                          <h4 className="text-sm font-medium mb-2">Cover Letter</h4>
                          <p className="text-sm whitespace-pre-line">{coverLetter}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t flex items-center justify-between">
              {applicationStep > 1 ? (
                <button 
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
              ) : (
                <button 
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  onClick={() => setIsApplyDialogOpen(false)}
                >
                  Cancel
                </button>
              )}

              {applicationStep < 3 ? (
                <button
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                    (applicationStep === 1 && !isQuestionStepComplete) || 
                    (applicationStep === 2 && !isResumeStepComplete) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                  onClick={handleNextStep}
                  disabled={
                    (applicationStep === 1 && !isQuestionStepComplete) || 
                    (applicationStep === 2 && !isResumeStepComplete)
                  }
                >
                  Continue
                </button>
              ) : (
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleSubmitApplication}
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
