import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { fetchPosts, deletePost, likePost, sharePost } from '../../store/slices/postsSlice';
import { selectPostsByPlatform } from '../../store/selectors/postsSelectors';
import './PostList.css';

const PostList = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { colors } = useTheme();
  const posts = useSelector(selectPostsByPlatform);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await dispatch(deletePost(postId)).unwrap();
    }
  };

  const handleLike = (postId) => {
    dispatch(likePost(postId));
  };

  const handleShare = (postId) => {
    dispatch(sharePost(postId));
  };

  if (status === 'loading') {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="post-list" style={{ backgroundColor: colors.background }}>
      <div className="post-list-container">
        <h2 style={{ color: colors.text }}>📝 Posts</h2>

        {posts.length === 0 ? (
          <div className="no-posts" style={{ color: colors.text }}>
            <p>No posts found.</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => {
              // 👇 Role-based permissions
              const canEdit = (post.author === user?.username || user?.role === 'admin') && user?.role !== 'viewer';
              const canDelete = user?.role === 'admin';
              const canLike = true; // Sab like kar sakte hain
              const canShare = user?.role === 'admin' || user?.role === 'editor';
              
              return (
                <div key={post.id} className="post-card" style={{
                  backgroundColor: colors.cardBackground,
                  boxShadow: `0 2px 8px ${colors.shadow}`
                }}>
                  <div className="post-header">
                    <div className="post-platforms">
                      {post.platforms?.map(p => (
                        <span key={p} className="platform-tag">{p}</span>
                      ))}
                    </div>
                    <span className="post-author">{post.author}</span>
                    {user?.role === 'viewer' && (
                      <span className="viewer-badge" style={{
                        backgroundColor: '#f39c12',
                        color: 'white',
                        padding: '2px 10px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        marginLeft: '8px'
                      }}>
                        👁️ Viewer
                      </span>
                    )}
                  </div>

                  <h3 style={{ color: colors.text }}>{post.title}</h3>
                  <p style={{ color: colors.text }}>{post.content}</p>

                  <div className="post-meta">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <div className="post-actions">
                      {/* 👇 Like - Sab kar sakte hain */}
                      <button onClick={() => handleLike(post.id)} className="action-btn like">
                        ❤️ {post.likes || 0}
                      </button>
                      
                      {/* 👇 Share - Sirf Admin aur Editor */}
                      {canShare && (
                        <button onClick={() => handleShare(post.id)} className="action-btn share">
                          🔄 {post.shares || 0}
                        </button>
                      )}
                      {!canShare && (
                        <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>
                          🔒 {post.shares || 0}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 👇 Edit/Delete - Sirf Admin aur Editor (unke apne posts ke liye) */}
                  {(canEdit || canDelete) && (
                    <div className="post-controls">
                      {canEdit && <button className="edit-btn">✏️ Edit</button>}
                      {canDelete && (
                        <button className="delete-btn" onClick={() => handleDelete(post.id)}>
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;