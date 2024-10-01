import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';





axios.defaults.baseURL = 'https://6656017a3c1d3b60293beb10.mockapi.io';

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

