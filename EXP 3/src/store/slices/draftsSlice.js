import { createSlice } from '@reduxjs/toolkit';

const loadDrafts = () => {
  const drafts = localStorage.getItem('drafts');
  return drafts ? JSON.parse(drafts) : [];
};

const saveDrafts = (drafts) => {
  localStorage.setItem('drafts', JSON.stringify(drafts));
};

const draftsSlice = createSlice({
  name: 'drafts',
  initialState: {
    items: loadDrafts(),
    status: 'idle',
  },
  reducers: {
    addDraft: (state, action) => {
      const newDraft = {
        id: Date.now(),
        ...action.payload,
        savedAt: new Date().toISOString(),
      };
      state.items.unshift(newDraft);
      saveDrafts(state.items);
    },
    updateDraft: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex(draft => draft.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
        saveDrafts(state.items);
      }
    },
    deleteDraft: (state, action) => {
      state.items = state.items.filter(draft => draft.id !== action.payload);
      saveDrafts(state.items);
    },
    clearDrafts: (state) => {
      state.items = [];
      saveDrafts(state.items);
    },
  },
});

export const { addDraft, updateDraft, deleteDraft, clearDrafts } = draftsSlice.actions;
export default draftsSlice.reducer;