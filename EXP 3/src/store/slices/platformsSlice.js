import { createSlice } from '@reduxjs/toolkit';

const platformsSlice = createSlice({
  name: 'platforms',
  initialState: {
    platforms: [
      { id: 'twitter', name: 'Twitter', icon: '🐦', maxChars: 280, supportsMedia: true, hashtagRequired: false, color: '#1DA1F2' },
      { id: 'facebook', name: 'Facebook', icon: '📘', maxChars: 5000, supportsMedia: true, hashtagRequired: false, color: '#1877F2' },
      { id: 'linkedin', name: 'LinkedIn', icon: '🔗', maxChars: 3000, supportsMedia: true, hashtagRequired: false, color: '#0A66C2' },
      { id: 'instagram', name: 'Instagram', icon: '📸', maxChars: 2200, supportsMedia: true, hashtagRequired: true, color: '#E4405F' },
    ],
    selected: ['twitter', 'facebook'],
  },
  reducers: {
    togglePlatform: (state, action) => {
      const platformId = action.payload;
      const index = state.selected.indexOf(platformId);
      if (index === -1) {
        state.selected.push(platformId);
      } else {
        state.selected.splice(index, 1);
      }
    },
    setSelectedPlatforms: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { togglePlatform, setSelectedPlatforms } = platformsSlice.actions;
export default platformsSlice.reducer;