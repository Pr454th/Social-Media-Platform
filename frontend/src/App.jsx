import React from "react";
import Home from "./pages/Home";
import Post from "./pages/Post";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="md:container md:mx-auto dark:bg-dark">
      <Home />
      {/* <Post /> */}
    </div>
  );
}
