import { useAuth } from "./authentication";
import "../Login/style/dashboard_style.css"
const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>Loading user...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome back, {user.name}!</h2>
      <p>🎯 Your Goal: {user.goals} kg CO₂</p>
      <p>🧹 Trash Collected: {user.trash} items</p>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
