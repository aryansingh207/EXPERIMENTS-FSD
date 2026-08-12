import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import draftsReducer from './slices/draftsSlice';
import platformsReducer from './slices/platformsSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    drafts: draftsReducer,
    platforms: platformsReducer,
    auth: authReducer,
  },
});

export { store };
export default store;