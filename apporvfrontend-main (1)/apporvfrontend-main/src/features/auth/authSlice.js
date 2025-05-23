import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authAPI';

const initialState = {
  loggedInUser:null,
  status: 'idle',
  error:null
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
   
    return response.data;
  }
);



export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo, {rejectWithValue}) => {
    try{
      const response = await checkUser(loginInfo);
   
      return response.data;
    }catch(error){
     return rejectWithValue(error)
    }
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);
   
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase( checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase( checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase( checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error= action.payload;
      })
      .addCase( signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase( signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
  },
});

export const selectLoggedInUser = (state)=>state.auth.loggedInUser;
export const selectError= (state)=>state.auth.error;

export const { increment} = authSlice.actions;



export default authSlice.reducer;
