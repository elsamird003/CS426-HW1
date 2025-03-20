import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GoalTracker from "./components/goals.tsx";
import FetchQuote from "./components/fetch.tsx"; 
import CarbonChart from "./components/chart.tsx";
import CarbonIntensityChart from "./components/electricity.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <GoalTracker />
    <FetchQuote />  
    <CarbonChart />
    <CarbonIntensityChart />
  </StrictMode>
);
