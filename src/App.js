import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MoviesPage from "./components/MoviesPage";
import TVSeriesPage from "./components/TVSeriesPage";
import GenresPage from "./components/GenresPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <AuthProvider>
      <Router>
        <div className={`App ${theme}`}>
          <Navbar theme={theme} toggleTheme={toggleTheme} onSearch={handleSearch} />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<MoviesPage searchQuery={searchQuery} />} />
            <Route path="/movies" element={<MoviesPage searchQuery={searchQuery} />} />
            <Route path="/tvseries" element={<TVSeriesPage searchQuery={searchQuery} />} />
            <Route path="/genres" element={<GenresPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
