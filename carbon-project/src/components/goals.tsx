import { useReducer } from "react";
import { useAuth } from "./Login/authentication"; // adjust path as needed
import "./goals_style.css";

// Types for state and actions
type GoalState = {
  goal: number;
  progress: number;
};

type GoalAction =
  | { type: "SET_GOAL"; payload: number }
  | { type: "UPDATE_PROGRESS"; payload: number };

// Reducer function to handle state updates
const goalReducer = (state: GoalState, action: GoalAction): GoalState => {
  switch (action.type) {
    case "SET_GOAL":
      return { ...state, goal: action.payload };
    case "UPDATE_PROGRESS":
      return { ...state, progress: action.payload };
    default:
      return state;
  }
};

export default function GoalTracker() {
  const { user, updateGoals } = useAuth();

  const [state, dispatch] = useReducer(goalReducer, {
    goal: user?.goals ?? 0,
    progress: 0,
  });

  // Motivational messages
  const getMotivationalMessage = () => {
    if (state.progress >= state.goal) return "🎉 Congrats! You've reached your goal!";
    if (state.progress >= state.goal * 0.75) return "🔥 Almost there! Keep going!";
    if (state.progress >= state.goal * 0.5) return "💪 Great job! You're halfway!";
    return "🌱 Every step counts! Keep pushing!";
  };

  // Handle goal input and sync with context
  const handleGoalChange = (value: number) => {
    dispatch({ type: "SET_GOAL", payload: value });
    updateGoals(value); // 🔥 sync with user's profile
  };

  return (
    <div className="goal-tracker">
      <h2>Carbon Footprint Goal Tracker</h2>

      <label>Set your CO₂ reduction goal (kg):</label>
      <input
        type="number"
        value={state.goal}
        onChange={(e) => handleGoalChange(Number(e.target.value))}
      />

      <label>Enter your progress (kg):</label>
      <input
        type="number"
        value={state.progress}
        onChange={(e) =>
          dispatch({ type: "UPDATE_PROGRESS", payload: Number(e.target.value) })
        }
      />

      <p>Goal: {state.goal} kg | Progress: {state.progress} kg</p>
      <p>{getMotivationalMessage()}</p>
    </div>
  );
}
