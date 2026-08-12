import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './ViewerPanel.css';

const ViewerPanel = () => {
  const { user } = useAuth();
  const { colors } = useTheme();

  return (
    <div className="viewer-panel" style={{ backgroundColor: colors.background }}>
      <div className="panel-container">
        <div className="panel-header">
          <h1 style={{ color: colors.text }}>👁️ Viewer Panel</h1>
          <p style={{ color: colors.text }}>Available to all authenticated users</p>
        </div>

        <div className="viewer-content">
          <div className="viewer-card" style={{ 
            backgroundColor: colors.cardBackground,
            boxShadow: `0 4px 12px ${colors.shadow}`
          }}>
            <h3 style={{ color: colors.text }}>📚 Available Content</h3>
            <div className="content-list">
              <div className="content-item">
                <div className="content-icon">📄</div>
                <div>
                  <h4>JWT Authentication Guide</h4>
                  <p>Learn how JWT tokens work in authentication</p>
                </div>
                <span className="content-meta">Read More →</span>
              </div>
              <div className="content-item">
                <div className="content-icon">🛡️</div>
                <div>
                  <h4>Understanding RBAC</h4>
                  <p>Role-Based Access Control explained</p>
                </div>
                <span className="content-meta">Read More →</span>
              </div>
              <div className="content-item">
                <div className="content-icon">🔐</div>
                <div>
                  <h4>Security Best Practices</h4>
                  <p>Essential security practices for web apps</p>
                </div>
                <span className="content-meta">Read More →</span>
              </div>
            </div>
          </div>

          <div className="viewer-card" style={{ 
            backgroundColor: colors.cardBackground,
            boxShadow: `0 4px 12px ${colors.shadow}`
          }}>
            <h3 style={{ color: colors.text }}>📊 System Status</h3>
            <div className="status-grid">
              <div className="status-item">
                <span className="status-label">Authentication</span>
                <span className="status-value online">✓ Online</span>
              </div>
              <div className="status-item">
                <span className="status-label">Database</span>
                <span className="status-value online">✓ Connected</span>
              </div>
              <div className="status-item">
                <span className="status-label">JWT Service</span>
                <span className="status-value online">✓ Active</span>
              </div>
              <div className="status-item">
                <span className="status-label">Session</span>
                <span className="status-value online">✓ Active</span>
              </div>
            </div>
          </div>

          <div className="viewer-card" style={{ 
            backgroundColor: colors.cardBackground,
            boxShadow: `0 4px 12px ${colors.shadow}`
          }}>
            <h3 style={{ color: colors.text }}>ℹ️ RBAC Information</h3>
            <div className="rbac-info">
              <p><strong>Your Role:</strong> {user?.role?.toUpperCase()}</p>
              <p><strong>Access Level:</strong> {user?.role === 'admin' ? 'Full Access' : user?.role === 'editor' ? 'Editing Access' : 'View Only'}</p>
              <div className="access-indicator">
                <span className="access-dot"></span>
                <span>You have {user?.role === 'admin' ? 'administrative' : user?.role === 'editor' ? 'editorial' : 'viewer'} access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerPanel;