import React, { useState } from 'react';

const PostList = ({
  posts,
  onDelete,
  onUpdate,
  onGetPosts
}) => {

  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [filter, setFilter] = useState('all');
  const [platform, setPlatform] = useState('Twitter');

  const handleEditClick = (post) => {
    setEditingId(post.id);
    setEditContent(post.content);
  };

  const handleSaveClick = (id, postPlatform, draft) => {
    onUpdate(id, {
      platform: postPlatform,
      content: editContent,
      draft
    });

    setEditingId(null);
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleGetPosts = () => {
    onGetPosts(platform);
  };

  const filteredPosts = posts.filter((post) => {

    if (filter === 'draft') {
      return post.draft;
    }

    if (filter === 'published') {
      return !post.draft;
    }

    return true;
  });

  return (
    <div className="post-list">

      <div className="post-list-header">

        <h2>Recent Posts</h2>

        <div className="post-filters">

          <button
            className={filter === 'all'
              ? 'filter-btn active'
              : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All
          </button>

          <button
            className={filter === 'published'
              ? 'filter-btn active'
              : 'filter-btn'}
            onClick={() => setFilter('published')}
          >
            Published
          </button>

          <button
            className={filter === 'draft'
              ? 'filter-btn active'
              : 'filter-btn'}
            onClick={() => setFilter('draft')}
          >
            Drafts
          </button>

          <select
            className="platform-select"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="Twitter">Twitter</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
          </select>

          <button
            className="get-posts-btn"
            onClick={handleGetPosts}
          >
            Get Posts
          </button>

        </div>

      </div>

      {filteredPosts.length === 0 ? (

        <div className="no-posts">
          No posts found.
        </div>

      ) : (

        filteredPosts.map(post => (

          <div
            key={post.id}
            className="post-card"
          >

            <div className="post-header">

              <div className="post-badges">

                <span
                  className={`platform-badge ${post.platform.toLowerCase()}`}
                >
                  {post.platform}
                </span>

                <span
                  className={`status-badge ${
                    post.draft
                      ? 'draft'
                      : 'published'
                  }`}
                >
                  {post.draft
                    ? 'DRAFT'
                    : 'PUBLISHED'}
                </span>

              </div>

              <div className="post-actions">

                {editingId === post.id ? (

                  <>
                    <button
                      className="action-btn save"
                      onClick={() =>
                        handleSaveClick(
                          post.id,
                          post.platform,
                          post.draft
                        )
                      }
                    >
                      Save
                    </button>

                    <button
                      className="action-btn cancel"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </>

                ) : (

                  <>
                    <button
                      className="action-btn edit"
                      onClick={() =>
                        handleEditClick(post)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() =>
                        onDelete(post.id)
                      }
                    >
                      Delete
                    </button>
                  </>

                )}

              </div>

            </div>

            <div className="post-body">

              {editingId === post.id ? (

                <textarea
                  value={editContent}
                  onChange={(e) =>
                    setEditContent(e.target.value)
                  }
                  rows="4"
                  className="edit-textarea"
                />

              ) : (

                <p>{post.content}</p>

              )}

            </div>

          </div>

        ))
      )}

    </div>
  );
};

export default PostList;