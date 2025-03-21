import { useState } from "react";
import { useAuth } from "./authentication";
import "./style/login.css";
const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      alert("Invalid email.");
    }
  };

  return (
    <div className="login-container">
  <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    <input
      type="email"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button type="submit">Log In</button>
  </form>
</div>

  );
};

export default Login;
