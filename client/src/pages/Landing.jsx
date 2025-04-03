// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">AI-Powered Recruitment</h1>
      <p className="mt-4 text-gray-600">Find your dream job with AI-powered recommendations.</p>
      <Link to="/login">
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Landing;
