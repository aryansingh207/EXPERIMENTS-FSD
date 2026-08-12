import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const { colors } = useTheme();

  return (
    <div className="admin-panel" style={{ backgroundColor: colors.background }}>
      <div className="panel-container">
        <div className="panel-header">
          <h1 style={{ color: colors.text }}>🛡️ Admin Panel</h1>
          <p style={{ color: colors.text }}>Restricted to Admins Only</p>
        </div>

        <div className="admin-content">
          <div className="admin-card" style={{ 
            backgroundColor: colors.cardBackground,
            boxShadow: `0 4px 12px ${colors.shadow}`
          }}>
            <h3 style={{ color: colors.text }}>👥 User Management</h3>
            <div className="user-list">
              <div className="user-item">
                <span>admin</span>
                <span className="role-badge admin">Admin</span>
                <button className="action-btn edit">Edit</button>
                <button className="action-btn delete">Delete</button>
              </div>
              <div className="user-item">
                <span>editor</span>
                <span className="role-badge editor">Editor</span>
                <button className="action-btn edit">Edit</button>
                <button className="action-btn delete">Delete</button>
              </div>
              <div className="user-item">
                <span>viewer</span>
                <span className="role-badge viewer">Viewer</span>
                <button className="action-btn edit">Edit</button>
                <button className="action-btn delete">Delete</button>
              </div>
            </div>
          </div>

          <div className="admin-card" style={{ 
            backgroundColor: colors.cardBackground,
            boxShadow: `0 4px 12px ${colors.shadow}`
          }}>
            <h3 style={{ color: colors.text }}>⚙️ System Settings</h3>
            <div className="settings-list">
              <div className="setting-item">
                <span>JWT Expiry Time</span>
                <span className="setting-value">1 hour</span>
              </div>
              <div className="setting-item">
                <span>Authentication Method</span>
                <span className="setting-value">JWT Bearer Token</span>
              </div>
              <div className="setting-item">
                <span>Token Storage</span>
                <span className="setting-value">localStorage</span>
              </div>
              <div className="setting-item">
                <span>Session Type</span>
                <span className="setting-value">Stateless</span>
              </div>
            </div>
          </div>

          <div className="admin-card" style={{ 
            backgroundColor: colors.cardBackground,
            boxShadow: `0 4px 12px ${colors.shadow}`
          }}>
            <h3 style={{ color: colors.text }}>📊 RBAC Permissions</h3>
            <div className="permissions-matrix">
              <div className="permission-row header">
                <span>Resource</span>
                <span>Admin</span>
                <span>Editor</span>
                <span>Viewer</span>
              </div>
              <div className="permission-row">
                <span>Dashboard</span>
                <span>✓</span>
                <span>✓</span>
                <span>✓</span>
              </div>
              <div className="permission-row">
                <span>Admin Panel</span>
                <span>✓</span>
                <span>✗</span>
                <span>✗</span>
              </div>
              <div className="permission-row">
                <span>Editor Panel</span>
                <span>✓</span>
                <span>✓</span>
                <span>✗</span>
              </div>
              <div className="permission-row">
                <span>Viewer Panel</span>
                <span>✓</span>
                <span>✓</span>
                <span>✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;