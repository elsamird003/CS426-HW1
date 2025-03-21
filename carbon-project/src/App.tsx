import "./App.css";
import { AuthProvider, useAuth } from "./components/Login/authentication";
import Login from "./components/Login/Login";
import { useState, useEffect } from "react";
import Dashboard from "./components/Login/Dashboard";
//import GoalTracker from "./components/goals";
import ForestInfo from "./components/Info/info"; // ✅ new resource feature

const logo = "/sm_5afb13ab8b839.jpg";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Optional: Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  // Apply class to body on toggle
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <div className="top-nav">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Carbon FootPrint Tracker</h1>
        <div className="dark-mode-toggle">
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? " Light Mode" : " Dark Mode"}
        </button> </div>
      </div>
      <MainPage />
    </AuthProvider>
  );
}

const MainPage = () => {
  const { user } = useAuth();
  return user ? (
    <>
      <Dashboard />
      <ForestInfo />
    </>
  ) : (
    <Login />
  );
};

export default App;