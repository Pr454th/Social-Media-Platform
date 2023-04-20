import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../Context/AuthContext";
import axios from "axios";
import PostView from "../Posts/PostView";
import PostForm from "../Posts/PostForm";
import Posts from "../Posts/Posts";
import Navbar from "../../components/NavBar/Navbar";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";

export default function Home() {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    axios.get("/api/auth/protect").then((res) => {
      if (res.data.user) {
        authDispatch({
          type: "LOGIN",
          user: res.data.user,
          isAuthenticated: true,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="dark:bg-dark">
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
      </div>
    </Router>
  );
}
