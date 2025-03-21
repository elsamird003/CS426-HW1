import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GoalTracker from "./components/Goals/goals.tsx"; 
import CarbonIntensityChart from "./components/electricity_chart/electricity.tsx";
import { AuthProvider}  from "./components/Login/authentication.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <CarbonIntensityChart />
      <GoalTracker />
    </AuthProvider>
  </StrictMode>
);

