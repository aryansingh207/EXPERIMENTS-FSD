import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';
import './Navigation.css';

const Navigation = () => {
  const { user, logout, hasRole } = useAuth();
  const { colors } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navigation" style={{ 
      backgroundColor: colors.cardBackground,
      borderBottom: `2px solid ${colors.border}`
    }}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/dashboard" style={{ color: colors.text }}>
            <span className="brand-icon">🔐</span>
            <span className="brand-text">Auth RBAC</span>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/dashboard" style={{ color: colors.text }}>Dashboard</Link>
          
          {hasRole('admin') && (
            <Link to="/admin" style={{ color: colors.text }}>Admin Panel</Link>
          )}
          
          {hasRole('editor') && (
            <Link to="/editor" style={{ color: colors.text }}>Editor Panel</Link>
          )}
          
          <Link to="/viewer" style={{ color: colors.text }}>Viewer Panel</Link>
        </div>

        <div className="nav-right">
          <ThemeToggle />
          
          <div className="user-info" style={{ color: colors.text }}>
            <span className="user-name">{user?.username}</span>
            <span className="user-role" style={{ 
              backgroundColor: colors.primary,
              color: 'white'
            }}>
              {user?.role}
            </span>
          </div>
          
          <button 
            className="logout-button"
            onClick={handleLogout}
            style={{ 
              backgroundColor: '#e74c3c',
              color: 'white'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;