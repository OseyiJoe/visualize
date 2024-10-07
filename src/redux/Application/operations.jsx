import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createClient } from 'pexels';
const apiKey = "LvPoIKzvfOmPhNGqaulfHz5WLbcnMNVZlzJmQTDZatGXgU953AqoGVZx";



const client = createClient(apiKey);


export const fetchPopularVideos = createAsyncThunk(
  'videos/fetchPopularVideos',
  async (_, thunkAPI) => {
    try {
      const response = await client.videos.popular({ per_page: 12 });
      console.log(response.videos);
      return response.videos;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const searchVideos = createAsyncThunk(
  'videos/searchVideos',
  async (query, thunkAPI) => {
    try {
      const response = await client.videos.search({ query, per_page: 12 });
      console.log(response.videos);
      return response.videos;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchVidWord = createAsyncThunk(
  'videos/fetchVidWord',
  async (query, thunkAPI) => {
    console.log(query);
    return query;
  }
);

export const fetchPopularImages = createAsyncThunk(
  'videos/fetchPopularImages',
  async (_, thunkAPI) => {
    try {
      const response = await client.photos.curated({ per_page: 12 });
      console.log(response);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const searchImages = createAsyncThunk(
  'videos/searchImages',
  async (query, thunkAPI) => {
    try {
      const response = await client.photos.search({ query, per_page: 12 });
      console.log(response);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchImgWord = createAsyncThunk(
  'videos/fetchImgWord',
  async (query, thunkAPI) => {
      console.log(query);
      return query;
  }
);

export const fetchVotes = createAsyncThunk(
  'Polls/fetchAll',
  async (_, thunkAPI) => {
    try {
        const response = await axios.get('/Polls/1');
        //console.log (response.data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addVote = createAsyncThunk(
  'Polls/addVote',
  async ({ votesVar, name }, thunkAPI) => {
    //const stay = 0;
    const updatedScoobyPolls = { ...votesVar, Scooby: votesVar.Scooby + 1 };
    const updatedGoofyPolls = { ...votesVar, Goofy: votesVar.Goofy + 1 };
    const updatedBrianPolls = { ...votesVar, Brian: votesVar.Brian + 1 };
    //console.log(votesVar);
    /*if(name === "Vote Scooby"){
    try{}
    else if(name === "Vote Goofy")
    } */
    if (name === 'Vote Scooby') {
      try {
        const response = await axios.put('/Polls/1', updatedScoobyPolls);
        console.log(response.data);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
    
    else if (name === 'Vote Goofy') {
 try {
   const response = await axios.put('/Polls/1', updatedGoofyPolls);
   console.log(response.data);
   return response.data;
 } catch (e) {
   return thunkAPI.rejectWithValue(e.message);
 }
    }
    
    else if (name === 'Vote Brian') {
     try {
       const response = await axios.put('/Polls/1', updatedBrianPolls);
       console.log(response.data);
       return response.data;
     } catch (e) {
       return thunkAPI.rejectWithValue(e.message);
     }
    }
  }
);

