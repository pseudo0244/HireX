import React from "react";
import { Link } from "react-router-dom";
import { Menu, Search, Bell, Plus, User, Settings, LogOut } from 'lucide-react';

export default function Header({ setSidebarOpen }) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6">
      <button
        className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <button className="relative rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              3
            </span>
          </button>
        </div>

        <Link
          to="/add-job"
          className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Job</span>
        </Link>

        <div className="relative">
          <div className="group">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
              <User className="h-5 w-5 text-gray-600" />
            </button>
            <div className="absolute right-0 top-full mt-1 hidden w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg group-hover:block">
              <Link
                to="/settings/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings/company"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
              <div className="my-1 border-t border-gray-100"></div>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
