import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPopularVideos,
  fetchSavedVideos,
  fetchVotes,
  addVote,
  searchVideos,
  fetchVidWord,
  fetchPopularImages,
  searchImages,
  fetchImgWord,
  saveVideos,
} from './operations';

const handlePending = state => {
  state.polls.ifLoading = true;
};
const handleRejected = (state, action) => {
  state.polls.ifLoading = false;
  state.polls.error = action.payload;
};

const appSlice = createSlice({
  name: 'app',
  initialState: {
    popularVideos: [],
    searchedVideos: [],
    savedVideos: [],
    searchVidWord: null,
    popularImages: [],
    searchedImages: [],
    searchImgWord: null,
    ifLoading: false,
    error: null,
    polls: {
      items: {},
      ifLoading: false,
      error: null,
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVotes.pending, handlePending)
      .addCase(fetchVotes.fulfilled, (state, action) => {
        state.polls.ifLoading = false;
        state.polls.error = null;
        state.polls.items = action.payload;
        //console.log(state.polls.items);
      })
      .addCase(fetchVotes.rejected, handleRejected)
      .addCase(addVote.pending, handlePending)
      .addCase(addVote.fulfilled, (state, action) => {
        state.polls.ifLoading = false;
        state.polls.error = null;
        state.polls.items = action.payload;
      })
      .addCase(addVote.rejected, handleRejected)
      .addCase(fetchPopularVideos.pending, state => {
        state.ifLoading = true;
      })
      .addCase(fetchPopularVideos.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.popularVideos = action.payload;
      })
      .addCase(fetchPopularVideos.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })
      .addCase(searchVideos.pending, state => {
        state.ifLoading = true;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.searchedVideos = action.payload;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchVidWord.fulfilled, (state, action) => {
        state.searchVidWord = action.payload;
      })
      .addCase(fetchPopularImages.pending, state => {
        state.ifLoading = true;
      })
      .addCase(fetchPopularImages.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.popularImages = action.payload.photos;
      })
      .addCase(fetchPopularImages.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })
      .addCase(searchImages.pending, state => {
        state.ifLoading = true;
      })
      .addCase(searchImages.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.searchedImages = action.payload.photos;
      })
      .addCase(searchImages.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchImgWord.fulfilled, (state, action) => {
        state.searchImgWord = action.payload;
      })
      .addCase(fetchSavedVideos.pending, state => {
        state.ifLoading = true;
      })
      .addCase(fetchSavedVideos.fulfilled, (state, action) => {
        state.ifLoading = false;
        state.error = null;
        state.savedVideos = action.payload;
      })
      .addCase(fetchSavedVideos.rejected, (state, action) => {
        state.ifLoading = false;
        state.error = action.payload;
      });
      
  },
});

export const appReducer = appSlice.reducer;
