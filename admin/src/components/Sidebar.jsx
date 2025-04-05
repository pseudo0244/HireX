import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  Users,
  CheckSquare,
  Calendar,
  Settings,
  LifeBuoy,
  BarChart2,
  FileText,
  Bell,
  FileText as ResumeIcon, // Added Resume Icon
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Applicants", path: "/applicants" },
    { icon: CheckSquare, label: "Schedule Tests", path: "/schedule-tests" },
    { icon: ResumeIcon, label: "View Resumes", path: "/resumes" }, // NEW BUTTON
  ];

  const settingsItems = [
    { icon: Settings, label: "Company", path: "/settings/company" },
    { icon: Bell, label: "Notifications", path: "/settings/notifications" },
    { icon: LifeBuoy, label: "Support", path: "/support" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600"></div>
            <span className="text-lg font-semibold">HireYatra</span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col h-[calc(100%-4rem)] justify-between">
          <nav className="space-y-1 p-4">
            <div className="mb-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors mb-1 ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Settings
              </p>
              {settingsItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors mb-1 ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
