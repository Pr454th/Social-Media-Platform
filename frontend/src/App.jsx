import React from "react";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}
