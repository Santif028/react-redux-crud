import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      return data as Post[];
    } catch (error) {
      throw new Error('Failed to fetch');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [] as Post[],
    status: 'idle' as 'idle' | 'pending' | 'fulfilled' | 'failed',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default postsSlice.reducer;