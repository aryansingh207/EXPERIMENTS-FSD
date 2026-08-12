import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { addPost } from '../../store/slices/postsSlice';
import { addDraft } from '../../store/slices/draftsSlice';
import { togglePlatform } from '../../store/slices/platformsSlice';
import { validateAllPlatforms, getPlatformLimits } from '../../utils/validation';
import './PostComposer.css';

const PostComposer = () => {
  const dispatch = useDispatch();
  const { user } = useAuth(); // 👈 User ko check karo
  const { colors } = useTheme();
  
  const platforms = useSelector((state) => state.platforms.platforms);
  const selectedPlatforms = useSelector((state) => state.platforms.selected);
  
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [charCounts, setCharCounts] = useState([]);

  // 👇 Check if user can create posts (Admin or Editor only)
  const canCreatePost = user?.role === 'admin' || user?.role === 'editor';

  useEffect(() => {
    const result = validateAllPlatforms(content, selectedPlatforms);
    setValidationErrors(result.errors);
    const limits = getPlatformLimits(selectedPlatforms, content);
    setCharCounts(limits);
  }, [content, selectedPlatforms]);

  const handleSubmit = async () => {
    if (selectedPlatforms.length === 0) {
      alert('Please select at least one platform');
      return;
    }
    if (validationErrors.length > 0) {
      alert('Please fix all errors before publishing:\n' + validationErrors.join('\n'));
      return;
    }
    setIsSubmitting(true);
    try {
      await dispatch(addPost({
        title: title || 'Untitled Post',
        content,
        platform: selectedPlatforms[0],
        platforms: selectedPlatforms,
        author: user?.username || 'anonymous',
        media: media ? { type: 'image', url: URL.createObjectURL(media) } : null,
      })).unwrap();
      setContent('');
      setTitle('');
      setMedia(null);
      alert('✅ Post published successfully!');
    } catch (error) {
      alert('❌ Failed to publish post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    if (!content && !title) {
      alert('Please add some content before saving as draft');
      return;
    }
    dispatch(addDraft({
      title: title || 'Untitled Draft',
      content,
      platforms: selectedPlatforms,
      media: media ? { type: 'image', name: media.name } : null,
    }));
    alert('💾 Draft saved successfully!');
  };

  // 👇 Agar Viewer hai toh show message, form nahi
  if (!canCreatePost) {
    return (
      <div className="post-composer" style={{ backgroundColor: colors.background }}>
        <div className="composer-container" style={{ 
          backgroundColor: colors.cardBackground,
          boxShadow: `0 4px 12px ${colors.shadow}`,
          textAlign: 'center',
          padding: '40px'
        }}>
          <h2 style={{ color: colors.text }}>✍️ Create New Post</h2>
          <div style={{ 
            padding: '30px', 
            background: 'rgba(74, 144, 226, 0.1)', 
            borderRadius: '12px',
            marginTop: '20px'
          }}>
            <span style={{ fontSize: '3rem' }}>🔒</span>
            <h3 style={{ color: colors.text, marginTop: '10px' }}>Viewer Access Only</h3>
            <p style={{ color: colors.text, opacity: 0.7 }}>
              You have view-only access. <br />
              Please contact an Admin or Editor to create posts.
            </p>
            <div style={{ 
              marginTop: '15px',
              padding: '12px',
              background: 'rgba(231, 76, 60, 0.1)',
              borderRadius: '8px',
              color: '#e74c3c'
            }}>
              ⚠️ Viewers can only view and like posts
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-composer" style={{ backgroundColor: colors.background }}>
      <div className="composer-container" style={{ 
        backgroundColor: colors.cardBackground,
        boxShadow: `0 4px 12px ${colors.shadow}`
      }}>
        <h2 style={{ color: colors.text }}>✍️ Create New Post</h2>
        
        <div className="composer-field">
          <input
            type="text"
            placeholder="Post Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.border }}
            className="title-input"
          />
        </div>

        <div className="composer-field">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.border }}
            className="content-input"
            rows="6"
          />
        </div>

        {selectedPlatforms.length > 0 && (
          <div className="char-limits">
            {charCounts.map(limit => (
              <div key={limit.id} className="char-limit-item">
                <span>{limit.icon} {limit.name}</span>
                <div className="char-progress">
                  <div className="char-progress-bar" style={{ width: `${Math.min(limit.percentage, 100)}%`, backgroundColor: limit.isOverLimit ? '#e74c3c' : '#27ae60' }} />
                </div>
                <span className={limit.isOverLimit ? 'over-limit' : 'under-limit'}>
                  {limit.currentCount}/{limit.maxChars}
                </span>
              </div>
            ))}
          </div>
        )}

        {validationErrors.length > 0 && (
          <div className="composer-errors">
            {validationErrors.map((error, index) => (
              <div key={index} className="error-item">⚠️ {error}</div>
            ))}
          </div>
        )}

        <div className="platform-selector">
          <label style={{ color: colors.text }}>Select Platforms:</label>
          <div className="platform-buttons">
            {platforms.map(platform => (
              <button
                key={platform.id}
                className={`platform-btn ${selectedPlatforms.includes(platform.id) ? 'active' : ''}`}
                onClick={() => dispatch(togglePlatform(platform.id))}
                style={{
                  backgroundColor: selectedPlatforms.includes(platform.id) ? platform.color : colors.background,
                  color: selectedPlatforms.includes(platform.id) ? 'white' : colors.text,
                  borderColor: colors.border
                }}
              >
                {platform.icon} {platform.name}
              </button>
            ))}
          </div>
        </div>

        <div className="composer-actions">
          <button className="btn-draft" onClick={handleSaveDraft} disabled={isSubmitting}>
            💾 Save Draft
          </button>
          <button
            className="btn-publish"
            onClick={handleSubmit}
            disabled={isSubmitting || validationErrors.length > 0 || selectedPlatforms.length === 0}
            style={{ backgroundColor: colors.primary, color: 'white' }}
          >
            {isSubmitting ? 'Publishing...' : '🚀 Publish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;