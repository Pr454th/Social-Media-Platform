import React from "react";
import PostView from "./pages/PostView";
import PostForm from "./pages/PostForm";
import Posts from "./pages/Posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="md:container md:mx-auto dark:bg-dark">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/postit" element={<PostForm />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostView />} />
        </Routes>
      </Router>
    </div>
  );
}
