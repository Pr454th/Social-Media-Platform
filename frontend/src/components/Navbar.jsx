import React from "react";
import { useState } from "react";
import { FaHome, FaPlus, FaList, FaImages } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white font-bold">
              <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
                Artistic Hub
              </h1>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a
                href="/"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
              >
                <FaHome className="text-white h-6 w-6" />
                <span className="ml-2">Home</span>
              </a>
              <a
                href="/postit"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
              >
                <FaPlus className="text-white h-6 w-6" />
                <span className="ml-2">Create</span>
              </a>
              <a
                href="/posts"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
              >
                <FaImages className="text-white h-6 w-6" />
                <span className="ml-2">Posts</span>
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Toggle menu"
              onClick={toggleNavbar}
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 sm:px-3">
          <a
            href="/"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
          >
            <FaHome className="text-white h-6 w-6" />
            <span className="ml-2">Home</span>
          </a>
          <a
            href="/postit"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
          >
            <FaPlus className="text-white h-6 w-6" />
            <span className="ml-2">Create</span>
          </a>
          <a
            href="/posts"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
          >
            <FaImages className="text-white h-6 w-6" />
            <span className="ml-2">Posts</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
