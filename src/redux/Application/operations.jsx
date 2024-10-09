import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createClient } from 'pexels';
import TheAuthAPI from 'theauthapi';

const accessKey = 'live_access_JrYRqAaVpzu32N2jVYfkSrT0fuef00cv6sOr9nxsXxzbJvIbgSstsVZ6WrFTtHcA';

const projectID = "420a7457-d5e2-463d-a743-ce69b03143f2"

const theAuthAPI = new TheAuthAPI(accessKey);

const apiKey = "LvPoIKzvfOmPhNGqaulfHz5WLbcnMNVZlzJmQTDZatGXgU953AqoGVZx";
const client = createClient(apiKey);

export const openModal = createAsyncThunk(
  'modal/open',
  async (_, thunkAPI) => {
  return true;
  }
);

export const closeModal = createAsyncThunk('modal/close', async (_, thunkAPI) => {
   return false;
});

export const openKeyModal = createAsyncThunk('keyModal/open', async (_, thunkAPI) => {
  return true;
});

export const closeKeyModal = createAsyncThunk(
  'keyModal/close',
  async (_, thunkAPI) => {
    return false;
  }
);


export const createKey = createAsyncThunk(
  'key/create',
  async ({ name, customAccountId, customMETAData }, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      const res = await axios.get('/clientData');
      const clients = res.data;

      const myClient = clients.find(client => client.token === persistedToken);
      if (!myClient) {
        const error = new Error(`Not Authorized`);
        error.status = 401;
      }
      console.log(myClient);
      const key = await theAuthAPI.apiKeys.createKey({
        projectId: projectID,
        customMetaData: { metadata_val: customMETAData },
        customAccountId,
        name
      });
      alert("KEY CREATED");
      console.log('Key created > ', key);
       await axios.put(`/clientData/${myClient.id}`, {
         ...myClient,
         apiKey: key.key,
         apiKeyName: key.name,
         apiAccountId: key.customAccountId,
         apiCreationDate: key.createdAt,
       });
      return key;
    } catch (e) {
      console.log("Couldn't make the key ", e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const retrieveKey = createAsyncThunk(
  'key/retrieveKey',
  async (_, thunkAPI) => {

    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const res = await axios.get('/clientData');
      const clients = res.data;

      const myClient = clients.find(client => client.token === persistedToken);
      if (!myClient) {
        const error = new Error(`Not Authorized`);
        error.status = 401;
      }
      //console.log(myClient);
      
      return myClient;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


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

export const fetchMorePopularVideos = createAsyncThunk(
  'videos/fetchMorePopularVideos',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const popularVidNmu = state.app.popularVidNmu;


    const moreVids = popularVidNmu + 12;
    try {
      const response = await client.videos.popular({ per_page: moreVids });
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
     const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    
     if (persistedToken === null) {
       return thunkAPI.rejectWithValue('Unable to fetch user');
    }
  
    try {
      const res = await axios.get('/clientData');
      const clients = res.data;
      const myClient = clients.find(client => client.token === persistedToken);
      if (!myClient) {
        const error = new Error(`Not Authorized`);
        error.status = 401;
        throw error;
      }
      if (myClient.apiKey === null) {
        alert('Go to homepage and create an API KEY to use this');
        const error = new Error(`Not Authorized`);
        error.status = 401;
        throw error;
      }
      const response = await client.videos.search({ query, per_page: 12 });
      console.log(response.videos);
      return response.videos;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const searchMoreVideos = createAsyncThunk(
  'videos/searchMoreVideos',
  async (query, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    const searchVidNmu = state.app.searchVidNmu;
    

    const moreVids = searchVidNmu + 12;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const res = await axios.get('/clientData');
      const clients = res.data;
      const myClient = clients.find(client => client.token === persistedToken);
      if (!myClient) {
        const error = new Error(`Not Authorized`);
        error.status = 401;
        throw error;
      }
      //const apiKey = myClient.apiKey, then validate
      const response = await client.videos.search({
        query,
        per_page: moreVids,
      });
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

export const fetchMorePopularImages = createAsyncThunk(
  'videos/fetchMorePopularImages',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const popularImgNmu = state.app.popularImgNmu;

    const moreImgs = popularImgNmu + 12;
    try {
      const response = await client.photos.curated({ per_page: moreImgs });
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
 const state = thunkAPI.getState();
 const persistedToken = state.auth.token;

 if (persistedToken === null) {
   return thunkAPI.rejectWithValue('Unable to fetch user');
 }
    try {
      const res = await axios.get('/clientData');
      const clients = res.data;
      const myClient = clients.find(client => client.token === persistedToken);
      if (!myClient) {
        const error = new Error(`Not Authorized`);
        error.status = 401;
        throw error;
      }
      if (myClient.apiKey === null) {
        alert('Go to homepage and create an API KEY to use this');
        const error = new Error(`Not Authorized`);
        error.status = 401;
        throw error;
      }
      
      const response = await client.photos.search({ query, per_page: 12 });
      console.log(response);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const searchMoreImages = createAsyncThunk(
  'videos/searchMoreImages',
  async (query, thunkAPI) => {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      const searchImgNmu = state.app.searchImgNmu;

      const moreImgs = searchImgNmu + 12;

      if (persistedToken === null) {
        return thunkAPI.rejectWithValue('Unable to fetch user');
      }

    try {
       const res = await axios.get('/clientData');
       const clients = res.data;
       const myClient = clients.find(client => client.token === persistedToken);
       if (!myClient) {
         const error = new Error(`Not Authorized`);
         error.status = 401;
         throw error;
       }
      const response = await client.photos.search({
        query,
        per_page: moreImgs,
      });
      console.log(response);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const saveVideos = createAsyncThunk(
  'videos/saveVideos',
  async ({ video_files }, thunkAPI) => {
     const state = thunkAPI.getState();
     const persistedToken = state.auth.token;

     if (persistedToken === null) {
       return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    
    try {
      const res = await axios.get('/clientData');
      const clients = res.data;
      const myClient = clients.find(client => client.token === persistedToken);
      if (!myClient) {
        const error = new Error(`Not Authorized`);
        error.status = 401;
        throw error;
      }

       if (myClient.apiKey === null) {
         alert('Go to homepage and create an API KEY to use this');
         const error = new Error(`Not Authorized`);
         error.status = 401;
         throw error;
       }
      await axios.post('/clientVideos', { video_files, owner: myClient.token });

    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteVideos = createAsyncThunk(
  'videos/deleteVideos', 
  async (vidId, thunkAPI) => {
    try {
      await axios.delete(`/clientVideos/${vidId}`); 
      return vidId; 
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const saveImages = createAsyncThunk(
  'images/saveImages', 
  async ({ image_files }, thunkAPI) => {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      if (persistedToken === null) {
        return thunkAPI.rejectWithValue('Unable to fetch user');
      }
    try {
      const res = await axios.get('/clientData');
      const clients = res.data;
      const myClient = clients.find(client => client.token === persistedToken);
      if (!myClient) {
        const error = new Error(`Not Authorized`);
        error.status = 401;
        throw error;
      }

      if (myClient.apiKey === null) {
        alert('Go to homepage and create an API KEY to use this');
        const error = new Error(`Not Authorized`);
        error.status = 401;
        throw error;
      }
      const response = await fetch(
        `https://6656017a3c1d3b60293beb10.mockapi.io/clientImages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image_files, owner: myClient.token }),
        }
      );

      
      if (!response.ok) {
        throw new Error('Failed to post saved images');
      }

      const data = await response.json(); 
      
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

export const fetchSavedImages = createAsyncThunk(
  'images/fetchImages', 
  async (_, thunkAPI) => {
     const state = thunkAPI.getState();
     const persistedToken = state.auth.token;

     if (persistedToken === null) {
       return thunkAPI.rejectWithValue('Unable to fetch user');
     }
    try {
       const res = await axios.get('/clientData');
       const clients = res.data;
       const myClient = clients.find(client => client.token === persistedToken);
       if (!myClient) {
         const error = new Error(`Not Authorized`);
         error.status = 401;
       }

      const response = await fetch(
        `https://6656017a3c1d3b60293beb10.mockapi.io/clientImages`
      );

      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json(); 
      const myData = data.filter(data => data.owner === myClient.token);
      console.log(myData);
      return myData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);


export const deleteImages = createAsyncThunk(
  'images/deleteImage', 
  async (myId, thunkAPI) => {
    console.log(myId);
    try {
      const response = await fetch(
        `https://6656017a3c1d3b60293beb10.mockapi.io/clientImages/${myId}`,
        {
          method: 'DELETE',
        }
      );

      
      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      return myId; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

export const fetchSavedVideos = createAsyncThunk(
  'videos/fetchsaveVideos',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const res = await axios.get('/clientData');
      const clients = res.data;
      const myClient = clients.find(client => client.token === persistedToken);
      if (!myClient) {
        const error = new Error(`Not Authorized`);
        error.status = 401;
      }
      const response = await axios.get('/clientVideos');
      //console.log(response.data);
      const myData = response.data.filter(data => data.owner === myClient.token);
      console.log(myData)
      return myData;
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

