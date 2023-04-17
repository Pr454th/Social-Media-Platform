import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPlus, FaImages, FaUser } from "react-icons/fa";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import AuthContext from "../../auth/authContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);
  const user = localStorage.getItem("user");
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold">
              <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
                Artistic Hub
              </h1>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
              >
                <FaHome className="text-white h-4 w-4" />
                <span className="ml-2">Home</span>
              </Link>
              <Link
                to="/posts"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
              >
                <FaImages className="text-white h-4 w-4" />
                <span className="ml-2">Posts</span>
              </Link>
              {token ? (
                <>
                  <Link
                    to="/postit"
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                  >
                    <FaPlus className="text-white h-4 w-4" />
                    <span className="ml-2">Create</span>
                  </Link>
                  <Link
                    to={`/profile/${user}`}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                  >
                    <FaUser className="text-white h-4 w-4" />
                    <span className="ml-2">{user}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                  >
                    <FiLogOut className="text-white h-4 w-4" />
                    <span className="ml-2">Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                >
                  <FiLogIn className="mr-2 h-4 w-4" />
                  Login
                </button>
              )}
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
          <Link
            to="/"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
          >
            <FaHome className="text-white h-4 w-4" />
            <span className="ml-2">Home</span>
          </Link>
          <Link
            to="/posts"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
          >
            <FaImages className="text-white h-4 w-4" />
            <span className="ml-2">Posts</span>
          </Link>
          {token ? (
            <>
              <Link
                to="/postit"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
              >
                <FaPlus className="text-white h-4 w-4" />
                <span className="ml-2">Create</span>
              </Link>
              <Link
                to={`/profile/${localStorage.getItem("user")}`}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
              >
                <FaUser className="text-white h-4 w-4" />
                <span className="ml-2">{user}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
              >
                <FiLogOut className="text-white h-4 w-4" />
                <span className="ml-2">Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
            >
              <FiLogIn className="mr-2 h-4 w-4" />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
