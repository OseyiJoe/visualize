import { configureStore } from '@reduxjs/toolkit';
//import { combineReducers } from 'redux';
import { votesReducer } from './votesSlice';






export const store = configureStore({
  reducer: {
    votes: votesReducer
  },
});


