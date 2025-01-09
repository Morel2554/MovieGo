import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    console.log("Registered User:", userData); // Replace with API call for registration
    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="AuthForm-container">
      <div className="AuthForm-card">
        <h2 className="AuthForm-title">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="AuthForm-input"
          />
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
            Register
          </button>
        </form>
        <p className="AuthForm-text">
          Already have an account? <a href="/login" className="AuthForm-link">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
