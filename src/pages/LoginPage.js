import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AuthForm.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { name: "John Doe", email };
    login(userData);
    alert("Login successful!");
    navigate("/movies");
  };

  return (
    <div className="AuthForm-container">
      <div className="AuthForm-card">
        <h2 className="AuthForm-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="AuthForm-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="AuthForm-input"
          />
          <button type="submit" className="AuthForm-button">
            Login
          </button>
        </form>
        <p className="AuthForm-text">
          Don't have an account? <a href="/register" className="AuthForm-link">Register here</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
