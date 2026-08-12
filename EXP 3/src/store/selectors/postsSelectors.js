import { createSelector } from '@reduxjs/toolkit';

export const selectAllPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectAllDrafts = (state) => state.drafts.items;
export const selectSelectedPlatforms = (state) => state.platforms.selected;
export const selectAllPlatforms = (state) => state.platforms.platforms;
export const selectAuthUser = (state) => state.auth.user;

export const selectPostsByPlatform = createSelector(
  [selectAllPosts, selectSelectedPlatforms],
  (posts, selectedPlatforms) => {
    if (selectedPlatforms.length === 0) return posts;
    return posts.filter(post => 
      post.platforms?.some(p => selectedPlatforms.includes(p)) || 
      selectedPlatforms.includes(post.platform)
    );
  }
);

export const selectPostCount = createSelector(
  [selectAllPosts],
  (posts) => posts.length
);

export const selectRecentPosts = createSelector(
  [selectAllPosts],
  (posts) => {
    return [...posts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }
);

export const selectCanEditPost = createSelector(
  [selectAuthUser, (state, postId) => postId, selectAllPosts],
  (user, postId, posts) => {
    if (!user) return false;
    const post = posts.find(p => p.id === postId);
    if (!post) return false;
    if (user.role === 'admin') return true;
    if (user.role === 'editor') return post.author === user.username;
    return false;
  }
);

export const selectCanDeletePost = createSelector(
  [selectAuthUser, (state, postId) => postId, selectAllPosts],
  (user, postId, posts) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return false;
  }
);