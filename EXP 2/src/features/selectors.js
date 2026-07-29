import { createSelector } from "reselect";

const selectPosts = (state) => state.posts.posts;
const selectPlatform = (state) => state.platforms.currentPlatform;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectPlatform],
  (posts, platform) => {
    return posts.filter((post) => post.platform === platform);
  }
);