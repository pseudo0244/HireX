import React from "react"
import { Home, Briefcase, BookmarkPlus, FileText, Calendar, Settings, LifeBuoy, Bell, User } from "lucide-react"

export default function Sidebar({ isOpen, setIsOpen }) {
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard/client" },
    { icon: Briefcase, label: "Find Jobs", path: "/jobs" },
    { icon: BookmarkPlus, label: "Saved Jobs", path: "/saved-jobs" },
    { icon: FileText, label: "Applications", path: "/applications" },
    { icon: Calendar, label: "Interviews", path: "/interviews" },
    { icon: User, label: "My Profile", path: "/profile" },
  ]

  const settingsItems = [
    { icon: Settings, label: "Account", path: "/settings/account" },
    { icon: Bell, label: "Notifications", path: "/settings/notifications" },
    { icon: LifeBuoy, label: "Help Center", path: "/help" },
  ]

  const isActive = (path) => {
    // In a real app, this would check the current path
    return path === "/dashboard/client"
  }

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600"></div>
            <span className="text-lg font-semibold">HireYatra</span>
          </div>
        </div>

        {/* Sidebar navigation */}
        <div className="flex flex-col h-[calc(100%-4rem)] justify-between">
          <nav className="space-y-1 p-4">
            <div className="mb-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors mb-1 ${
                    isActive(item.path) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* New Button: Prepare for Test Interview */}
            <a
  href="http://localhost:8501"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center rounded-md bg-blue-600 text-white px-3 py-2.5 text-sm font-medium transition-colors hover:bg-blue-700"
>
  Prepare for Test Interview
</a>


            <div className="pt-4 border-t mt-4">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Settings</p>
              {settingsItems.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors mb-1 ${
                    isActive(item.path) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 rounded-md bg-blue-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
