import React from "react";
import { useState, useEffect } from "react";
import ClientSidebar from "../components/Sidebar";
import ClientHeader from "../components/Header";
import { Briefcase, Clock, MapPin, BookmarkPlus, Send } from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    applications: 0,
    savedJobs: 0,
    interviews: 0,
    viewedJobs: 0,
  });
  // For Vite, use import.meta.env instead of process.env
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchJobs = () => {
      // Simulating API call with sample data
      const sampleJobs = [
        {
          id: 1,
          title: "Senior Frontend Developer",
          company: "TechCorp Inc.",
          location: "Remote",
          type: "Full-time",
          salary: "$90,000 - $120,000",
          posted: "2 days ago",
          description: "Build and maintain responsive user interfaces using React.",
          skills: ["React", "JavaScript", "CSS", "HTML"]
        },
        {
          id: 2,
          title: "UX/UI Designer",
          company: "DesignHub",
          location: "New York, NY",
          type: "Full-time",
          salary: "$80,000 - $100,000",
          posted: "1 week ago",
          description: "Design intuitive interfaces and user experiences.",
          skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"]
        },
        {
          id: 3,
          title: "Backend Developer",
          company: "ServerStack",
          location: "San Francisco, CA",
          type: "Contract",
          salary: "$70 - $90 per hour",
          posted: "3 days ago",
          description: "Work on APIs, databases, and server-side logic.",
          skills: ["Node.js", "Express", "MongoDB", "SQL"]
        },
        {
          id: 4,
          title: "Product Manager",
          company: "ProductLabs",
          location: "Chicago, IL",
          type: "Full-time",
          salary: "$110,000 - $140,000",
          posted: "5 days ago",
          description: "Lead product development and strategy.",
          skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"]
        },
      ];
      
      setJobs(sampleJobs);
      
      // Set sample stats
      setStats({
        applications: 12,
        savedJobs: 8,
        interviews: 3,
        viewedJobs: 24,
      });
    };

    fetchJobs();
  }, [API_URL]);

  return (
    <div className="flex h-screen bg-gray-50">
      <ClientSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ClientHeader setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Job Dashboard</h1>
            <p className="text-gray-600">Find your next opportunity and track your applications.</p>
          </div>

          {/* Stats cards */}
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Applications</h3>
                <div className="rounded-full bg-blue-100 p-2">
                  <Send className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.applications}</p>
              <p className="mt-1 text-xs text-gray-600">Last 30 days</p>
            </div>

            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Saved Jobs</h3>
                <div className="rounded-full bg-purple-100 p-2">
                  <BookmarkPlus className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.savedJobs}</p>
              <p className="mt-1 text-xs text-gray-600">Review later</p>
            </div>

            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Interviews</h3>
                <div className="rounded-full bg-green-100 p-2">
                  <Briefcase className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.interviews}</p>
              <p className="mt-1 text-xs text-green-600">2 upcoming</p>
            </div>

            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Viewed Jobs</h3>
                <div className="rounded-full bg-yellow-100 p-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.viewedJobs}</p>
              <p className="mt-1 text-xs text-gray-600">Last 30 days</p>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recommended Jobs</h2>
              <a href="/jobs" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View all
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
                <div key={job.id} className="rounded-lg border bg-white p-5 shadow-sm">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <div className="text-sm text-gray-500">{job.posted}</div>
                  </div>
                  <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                  <p className="mt-2 text-sm text-gray-500">{job.type} • {job.salary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
