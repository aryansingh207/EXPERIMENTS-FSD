import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import PostComposer from '../posts/PostComposer';
import PostList from '../posts/PostList';
import DraftManager from '../posts/DraftManager';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { colors } = useTheme();

  return (
    <div className="dashboard" style={{ backgroundColor: colors.background }}>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 style={{ color: colors.text }}>📊 Dashboard</h1>
          <p style={{ color: colors.text }}>Welcome, {user?.username}!</p>
        </div>

        <div className="dashboard-content">
          <PostComposer />
          <PostList />
          <DraftManager />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;