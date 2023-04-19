import React from "react";
import { useState } from "react";
import PostView from "./pages/Posts/PostView";
import PostForm from "./pages/Posts/PostForm";
import Posts from "./pages/Posts/Posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AuthContext from "./auth/authContext";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  return (
    <Router>
      <div className="dark:bg-dark">
        <AuthProvider>
          {/* <AuthContext.Provider value={{ token, setToken }}> */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/postit" element={<PostForm />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:name" element={<Profile />} />
          </Routes>
          {/* </AuthContext.Provider> */}
        </AuthProvider>
      </div>
    </Router>
  );
}
