import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";

export default function Unauthorized() {
  return (
    <div>
      <div className="min-h-screen dark:bg-black">
        <div className="flex flex-col items-center justify-center h-full">
          <FiAlertTriangle className="w-16 h-16 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
            Unauthorized Access
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            You must log in to access this page.
          </p>
          <Link
            to="/login"
            className={`mt-4 inline-flex items-center px-6 py-3 text-base font-bold text-white uppercase bg-${
              darkMode ? "red-500" : "indigo-500"
            } rounded-md hover:bg-${
              darkMode ? "red-600" : "indigo-600"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
              darkMode ? "red-500" : "indigo-500"
            }`}
          >
            <FaSignInAlt className="mr-2" />
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
