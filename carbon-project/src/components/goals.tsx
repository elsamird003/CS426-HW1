import { useEffect, useState } from "react";
import { useAuth } from "./Login/authentication"; // adjust path if needed
import "./goals_style.css";

export default function GoalTracker() {
  const { user, updateGoals, updateTrash } = useAuth();

  // Local state
  const [goal, setGoal] = useState(user?.goals ?? 0);
  const [progress, setProgress] = useState(user?.trash ?? 0);

  // Sync with context if it changes
  useEffect(() => {
    setGoal(user?.goals ?? 0);
    setProgress(user?.trash ?? 0);
  }, [user?.goals, user?.trash]);

  const getMotivationalMessage = () => {
    if (progress >= goal) return "🎉 Congrats! You've reached your goal!";
    if (progress >= goal * 0.75) return "🔥 Almost there! Keep going!";
    if (progress >= goal * 0.5) return "💪 Great job! You're halfway!";
    return "🌱 Every step counts! Keep pushing!";
  };

  const handleGoalChange = (value: number) => {
    setGoal(value);
    updateGoals(value); // update context
  };

  const handleProgressChange = (value: number) => {
    setProgress(value);
    updateTrash(value); // update context
  };

  return (
    <div className="goal-tracker">
      <h2>Carbon Footprint Goal Tracker</h2>

      <label>Goal of planting a tree a week:</label>
      <input
        type="number"
        value={goal}
        onChange={(e) => handleGoalChange(Number(e.target.value))}
      />

      <label>Trash picked on a day:</label>
      <input
        type="number"
        value={progress}
        onChange={(e) => handleProgressChange(Number(e.target.value))}
      />

      <p>Tree progress: {goal}  | Trash picked: {progress} </p>
      <p>{getMotivationalMessage()}</p>
    </div>
  );
}
