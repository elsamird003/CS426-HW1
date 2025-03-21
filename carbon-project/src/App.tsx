import "./App.css";
import { AuthProvider, useAuth } from "./components/Login/authentication";
import Login from "./components/Login/Login";
import Dashboard from "./components/Login/Dashboard";
//import GoalTracker from "./components/goals";
import ForestInfo from "./components/Info/info"; // ✅ new resource feature

const logo = "/sm_5afb13ab8b839.jpg";

function App() {
  return (
    <AuthProvider>
      <div className="top-nav">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Carbon FootPrint Tracker</h1>
      </div>
      <MainPage />
    </AuthProvider>
  );
}

const MainPage = () => {
  const { user } = useAuth();

  if (!user) return <Login />;

  return (
    <>
      <Dashboard />
      <ForestInfo />
    </>
  );
};

export default App;
