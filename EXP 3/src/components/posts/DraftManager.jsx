import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { deleteDraft, updateDraft } from '../../store/slices/draftsSlice';
import './DraftManager.css';

const DraftManager = () => {
  const dispatch = useDispatch();
  const { user } = useAuth(); // 👈 User ko check karo
  const { colors } = useTheme();
  const drafts = useSelector((state) => state.drafts.items);
  const [editingDraft, setEditingDraft] = useState(null);

  // 👇 Check if user can manage drafts (Admin or Editor only)
  const canManageDrafts = user?.role === 'admin' || user?.role === 'editor';

  const handleDelete = (draftId) => {
    if (window.confirm('Delete this draft?')) {
      dispatch(deleteDraft(draftId));
    }
  };

  const handleSaveEdit = (draftId, updates) => {
    dispatch(updateDraft({ id: draftId, updates }));
    setEditingDraft(null);
  };

  return (
    <div className="draft-manager" style={{ backgroundColor: colors.background }}>
      <div className="draft-container">
        <h2 style={{ color: colors.text }}>💾 Drafts</h2>

        {drafts.length === 0 ? (
          <div className="no-drafts" style={{ color: colors.text }}>
            <p>No drafts saved.</p>
          </div>
        ) : (
          <div className="drafts-grid">
            {drafts.map(draft => (
              <div key={draft.id} className="draft-card" style={{
                backgroundColor: colors.cardBackground,
                boxShadow: `0 2px 8px ${colors.shadow}`
              }}>
                {editingDraft?.id === draft.id && canManageDrafts ? (
                  <div className="draft-edit">
                    <input
                      type="text"
                      value={editingDraft.title}
                      onChange={(e) => setEditingDraft({...editingDraft, title: e.target.value})}
                      style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.border }}
                    />
                    <textarea
                      value={editingDraft.content}
                      onChange={(e) => setEditingDraft({...editingDraft, content: e.target.value})}
                      style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.border }}
                      rows="4"
                    />
                    <div className="draft-edit-actions">
                      <button onClick={() => handleSaveEdit(draft.id, editingDraft)}>💾 Save</button>
                      <button onClick={() => setEditingDraft(null)}>❌ Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="draft-header">
                      <h3 style={{ color: colors.text }}>{draft.title}</h3>
                      <span className="draft-date">{new Date(draft.savedAt).toLocaleDateString()}</span>
                    </div>
                    <p style={{ color: colors.text }}>{draft.content?.substring(0, 150)}...</p>
                    <div className="draft-platforms">
                      {draft.platforms?.map(p => (
                        <span key={p} className="platform-tag">{p}</span>
                      ))}
                    </div>
                    
                    {/* 👇 Viewer ke liye sirf view option, edit/delete nahi */}
                    <div className="draft-actions">
                      {canManageDrafts ? (
                        <>
                          <button className="edit-btn" onClick={() => setEditingDraft(draft)}>✏️ Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(draft.id)}>🗑️ Delete</button>
                        </>
                      ) : (
                        <div className="viewer-badge">
                          <span style={{ 
                            color: colors.text, 
                            opacity: 0.6,
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            👁️ View Only
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftManager;