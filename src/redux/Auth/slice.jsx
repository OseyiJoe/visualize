import { createSlice } from '@reduxjs/toolkit';
import { addUser, logUserIn, logUserOut, refreshUser } from './operations';

const initialState = {
  user: { name: null, email: null},
  token: null,
  ifLoggedIn: false,
  ifRegistered: false,
  ifRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(addUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        //state.token = action.payload.token;
        state.ifRegistered = true;
      })
      .addCase(logUserIn.fulfilled, (state, action) => {
       state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.ifLoggedIn = true;
        //state.isRegistered = false;
      })
      .addCase(logUserOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.ifLoggedIn = false;
        state.ifRegistered = false;
      })
      .addCase(refreshUser.pending, state => {
        state.ifRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        //state.user.token = action.payload.token;
        state.ifLoggedIn = true;
        state.ifRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.ifRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
