
import { createSlice } from '@reduxjs/toolkit';
import { fetchVotes, addVote } from './operations';

const handlePending = state => {
  state.polls.isLoading = true;
};
const handleRejected = (state, action) => {
  state.polls.isLoading = false;
  state.polls.error = action.payload;
};


const votesSlice = createSlice({
  name: 'votes',
  initialState:{
  polls: {
    items: {},
    isLoading: false,
    error: null,
  }
},
  extraReducers: builder => {
    builder
      .addCase(fetchVotes.pending, handlePending)
      .addCase(fetchVotes.fulfilled, (state, action) => {
        state.polls.isLoading = false;
        state.polls.error = null;
        state.polls.items = action.payload;
        //console.log(state.polls.items);
      })
      .addCase(fetchVotes.rejected, handleRejected)
      .addCase(addVote.pending, handlePending)
      .addCase(addVote.fulfilled, (state, action) => {
        state.polls.isLoading = false;
        state.polls.error = null;
        state.polls.items = action.payload;
      })
      .addCase(addVote.rejected, handleRejected)


  },
});



export const votesReducer = votesSlice.reducer;