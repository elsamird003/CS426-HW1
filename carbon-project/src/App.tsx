import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/Login/authentication";
import "./App.css";
import logo from "../public/sm_5afb13ab8b839.jpg";
import Login from "./components/Login/log";
import Dashboard from "./components/Login/Dashboard";
import { JSX } from "react";

// Protected Route Wrapper (Only allow access if logged in)
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="top-nav">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Carbon FootPrint Tracker</h1>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;