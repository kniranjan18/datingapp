import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/discover" className="nav-logo">
                    <span className="logo-icon">❤️</span>
                    LoveConnect
                </Link>

                <div className="nav-menu">
                    <Link to="/discover" className="nav-link">
                        <span className="nav-icon">🔍</span>
                        Discover
                    </Link>
                    <Link to="/matches" className="nav-link">
                        <span className="nav-icon">💑</span>
                        Matches
                    </Link>
                    <Link to="/profile" className="nav-link">
                        <span className="nav-icon">👤</span>
                        Profile
                    </Link>
                    <button onClick={handleLogout} className="nav-link logout-btn">
                        <span className="nav-icon">🚪</span>
                        Logout
                    </button>
                </div>

                {user && (
                    <div className="nav-user">
                        <span className="user-name">{user.name}</span>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
