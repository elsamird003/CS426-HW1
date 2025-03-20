import { useAuth } from "../Login/authentication";  
import { useNavigate } from "react-router-dom";
import "../Login/dashboard_style.css";
import defaultProfilePic from "../Login/istockphoto-930082108-612x612.jpg";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userProfile = {
    name: user?.split("@")[0] || "Guest",
    email: user || "guest@example.com",
    profilePic: defaultProfilePic,
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <img src={userProfile.profilePic} alt="Profile" className="profile-pic" />
        <h2>Welcome, {userProfile.name}!</h2>
        <p>Email: {userProfile.email}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
