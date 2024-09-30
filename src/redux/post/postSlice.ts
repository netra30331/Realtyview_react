import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from '@/shared/services/axios'
import { IPost, GetPostsDto, CreatePostDto, DeletePostsDto } from '@/shared/interfaces/interfaces'

interface PostState {
  posts: Array<IPost>
}

const initialState: PostState = {
  posts: [],
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<any>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (state, action) => {
      if(action.payload.success){
        state.posts = action.payload.posts;
      }
    });
    builder.addCase(getPostsFromDB.fulfilled, (state, action) => {
      if(action.payload.success){
        state.posts = action.payload.posts;
      }
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      if(action.payload.success){
        state.posts = action.payload.posts;
      }
    });
    builder.addCase(deletePosts.fulfilled, (state, action) => {
      if(action.payload.success){
        state.posts = action.payload.posts;
      }
    });
  },
});

export const postsAction = postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getPosts = (state: RootState) => 
  state.post.posts;

export default postSlice.reducer;

export const createPost = createAsyncThunk(
  'post/create',
  async (data: CreatePostDto) => {
    const response = await axios.post('post/create', data);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  'post/update',
  async (data: any) => {
    const response = await axios.put('post/update', data);
    return response.data;
  }
);

export const getPostsFromDB = createAsyncThunk(
  'post/get',
  async (data: GetPostsDto) => {
    const response = await axios.post('post/get', data);
    return response.data;
  }
);

export const deletePosts = createAsyncThunk(
  'post/delete',
  async (data: DeletePostsDto) => {
    const response = await axios.post('post/delete', data);
    return response.data;
  }
);
