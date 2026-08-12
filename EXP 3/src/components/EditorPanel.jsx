import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './EditorPanel.css';

const EditorPanel = () => {
  const { colors } = useTheme();

  return (
    <div className="editor-panel" style={{ backgroundColor: colors.background }}>
      <div className="panel-container">
        <div className="panel-header">
          <h1 style={{ color: colors.text }}>✏️ Editor Panel</h1>
          <p style={{ color: colors.text }}>Available to Editors and Admins</p>
        </div>

        <div className="editor-content">
          <div className="editor-card" style={{ 
            backgroundColor: colors.cardBackground,
            boxShadow: `0 4px 12px ${colors.shadow}`
          }}>
            <h3 style={{ color: colors.text }}>📝 Content Editor</h3>
            <div className="editor-area">
              <div className="editor-toolbar">
                <button className="toolbar-btn">B</button>
                <button className="toolbar-btn">I</button>
                <button className="toolbar-btn">U</button>
                <button className="toolbar-btn">H1</button>
                <button className="toolbar-btn">H2</button>
                <button className="toolbar-btn">Link</button>
                <button className="toolbar-btn">Image</button>
              </div>
              <textarea 
                className="content-editor"
                placeholder="Write your content here..."
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }}
              ></textarea>
              <button className="save-btn" style={{ backgroundColor: colors.primary, color: 'white' }}>
                Save Changes
              </button>
            </div>
          </div>

          <div className="editor-card" style={{ 
            backgroundColor: colors.cardBackground,
            boxShadow: `0 4px 12px ${colors.shadow}`
          }}>
            <h3 style={{ color: colors.text }}>📄 Recent Articles</h3>
            <div className="article-list">
              <div className="article-item">
                <div>
                  <h4>Getting Started with JWT</h4>
                  <p>Published: 2 hours ago</p>
                </div>
                <div className="article-actions">
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
                </div>
              </div>
              <div className="article-item">
                <div>
                  <h4>Understanding RBAC</h4>
                  <p>Published: 5 hours ago</p>
                </div>
                <div className="article-actions">
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
                </div>
              </div>
              <div className="article-item">
                <div>
                  <h4>Security Best Practices</h4>
                  <p>Published: 1 day ago</p>
                </div>
                <div className="article-actions">
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;