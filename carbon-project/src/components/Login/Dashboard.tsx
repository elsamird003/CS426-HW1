import { useAuth } from "./authentication";
import "./style/dashboard_style.css";

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h2>Welcome back, {user.email}!</h2>
        <p>Trees planted: {user.goals} kg CO₂</p> 
        <p>Trash Collected: {user.trash} items</p> 
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
};

export default Dashboard;
