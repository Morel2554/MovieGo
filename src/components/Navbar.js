import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = ({ theme, toggleTheme, onSearch }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="Navbar">
            <div className="Navbar-container">
                <Link to="/" className="Navbar-logo">
                    PPL MOVIE
                </Link>

                <ul className="Navbar-links">
                    <li>
                        <Link to="/movies" className="Navbar-link">Movies</Link>
                    </li>
                    <li>
                        <Link to="/tvseries" className="Navbar-link">TV Series</Link>
                    </li>
                    <li>
                        <Link to="/genres" className="Navbar-link">Genres</Link>
                    </li>
                </ul>

                <div className="Navbar-actions">
                    <input
                        type="text"
                        className="Navbar-search"
                        placeholder="Search..."
                        onChange={({ target }) => onSearch(target.value)}
                    />
                    <button className="theme-toggle-button" onClick={toggleTheme}>
                        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
                    </button>
                    {user ? (
                        <div className="Navbar-user">
                        <span className="Navbar-username">{user.name}</span>
                        <button className="Navbar-logout" onClick={logout}>
                            Logout
                        </button>
                        </div>
                    ) : (
                        <Link to="/login" className="Navbar-login">
                        Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
