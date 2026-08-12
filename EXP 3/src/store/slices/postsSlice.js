import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const storedPosts = localStorage.getItem('posts');
  if (storedPosts) {
    return JSON.parse(storedPosts);
  }
  return [
    {
      id: 1,
      title: 'Getting Started with React',
      content: 'React is a powerful library for building user interfaces...',
      platform: 'twitter',
      platforms: ['twitter', 'facebook'],
      author: 'admin',
      createdAt: new Date().toISOString(),
      likes: 10,
      shares: 5,
    },
    {
      id: 2,
      title: 'Understanding Redux Toolkit',
      content: 'Redux Toolkit simplifies Redux development...',
      platform: 'facebook',
      platforms: ['facebook', 'linkedin'],
      author: 'editor',
      createdAt: new Date().toISOString(),
      likes: 8,
      shares: 3,
    },
  ];
});

export const addPost = createAsyncThunk('posts/addPost', async (postData) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    id: Date.now(),
    ...postData,
    createdAt: new Date().toISOString(),
    likes: 0,
    shares: 0,
  };
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updates }) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { id, updates };
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return id;
});

export const likePost = createAsyncThunk('posts/likePost', async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return id;
});

export const sharePost = createAsyncThunk('posts/sharePost', async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        localStorage.setItem('posts', JSON.stringify(state.items));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        localStorage.setItem('posts', JSON.stringify(state.items));
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const index = state.items.findIndex(post => post.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updates };
          localStorage.setItem('posts', JSON.stringify(state.items));
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post.id !== action.payload);
        localStorage.setItem('posts', JSON.stringify(state.items));
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.items.find(p => p.id === action.payload);
        if (post) {
          post.likes += 1;
          localStorage.setItem('posts', JSON.stringify(state.items));
        }
      })
      .addCase(sharePost.fulfilled, (state, action) => {
        const post = state.items.find(p => p.id === action.payload);
        if (post) {
          post.shares += 1;
          localStorage.setItem('posts', JSON.stringify(state.items));
        }
      });
  },
});

export default postsSlice.reducer;