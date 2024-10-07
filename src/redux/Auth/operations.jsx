import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
//import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://66fef4ab2b9aac9c997debf1.mockapi.io/clients';



export const addUser = createAsyncThunk(
  'auth/addUser',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await axios.post('/clientData', {
        name,
        email,
        password,
      });
      //console.log(response.data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logUserIn = createAsyncThunk(
  'auth/logUserIn',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.get('/clientData');
      console.log(response.data);
      const clients = response.data
      const myClient = clients.find(client => client.email === email);
      if (!myClient) {
      const error = new Error(`Not Authorized`);
        error.status = 401;
        alert("Incorrect email or password")
      throw error; }
      if (myClient.password !== password) {
         const error = new Error(`Not Authorized`);
        error.status = 401;
        alert('Incorrect email or password');
        throw error; 
      }
      return myClient;
      
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const logUserOut = createAsyncThunk('auth/logUserOut', async (_, thunkAPI) => {
  try {
    await axios.get('/clientData');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const response = await axios.get('/clientData');
      const clients = response.data;
      const myClient = clients.find(
        client => client.token === persistedToken
      );
        if (myClient.length === 0) {
          const error = new Error(`Not Authorized`);
          error.status = 401;
        }
        return myClient;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

