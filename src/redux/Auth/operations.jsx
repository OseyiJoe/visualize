import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';
//import Notiflix from 'notiflix';
import { SignJWT } from 'jose';
import { jwtVerify } from 'jose';

axios.defaults.baseURL = 'https://66fef4ab2b9aac9c997debf1.mockapi.io/clients';

// Example function to sign JWT using jose
export async function signJWT(payload, secretOrPrivateKey, options = {}) {
  const secretKey = Buffer.from(secretOrPrivateKey);

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: options.algorithm || 'HS256' })
    .sign(secretKey);

  return jwt;
}

// Function to verify JWT using jose
export async function verifyJWT(token, secretOrPrivateKey, algorithm = 'HS256') {
  // Convert the secret key into a Buffer
  const secretKey = Buffer.from(secretOrPrivateKey);

  try {
    // Verify the token using the secret key
    const { payload, protectedHeader } = await jwtVerify(token, secretKey, {
      algorithms: [algorithm]
    });


    return payload; // Return the decoded payload if verification is successful
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return null;
  }
}



export const addUser = createAsyncThunk(
  'auth/addUser',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const payload = { eMail: email };
      //console.log(jwt);
      const secretKey = 'thisisaverysecurekey1234567890';

      const myMail = await signJWT(payload, secretKey, {
        algorithm: 'HS256',
      });
      const response = await axios.post('/clientData', {
        name,
        email:myMail,
        password: hashPassword,
        apiKey: null,
        apiKeyName: null,
        apiAccountId: null,
        apiCreationDate: null,
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
      //console.log(response.data);
      const secretKey = 'thisisaverysecurekey1234567890';
      
      const clients = response.data
     

     let myClient = null;

     for (const client of clients) {
       try {
         const payload = await verifyJWT(client.email, secretKey);

         // Check if the email matches
         if (payload.eMail === email) {
           myClient = client;
           break; // Exit the loop once a match is found
         }
       } catch (error) {
         // Log or handle the error, but continue the loop
         console.error(`Error verifying client ${client.email}:`, error);
       }
     }
      if (myClient === null) {
      const error = new Error(`Not Authorized`);
        error.status = 401;
        alert("Incorrect email or password")
        throw error;
      }
      
      const isPasswordCorrect = await bcrypt.compare(password, myClient.password);
      if (!isPasswordCorrect) {
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

