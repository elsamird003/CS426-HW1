
import { AuthProvider,  } from "./components/Login/authentication";
import "./App.css";
import logo from "../public/sm_5afb13ab8b839.jpg";


// Protected Route Wrapper (Only allow access if logged in)
function App() {
  return (
    <AuthProvider>
   
        <div className="top-nav">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Carbon FootPrint Tracker</h1>
        </div>
        
    </AuthProvider>
  );
}

export default App;