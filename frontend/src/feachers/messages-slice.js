
  import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';



  export const fetchMessages = createAsyncThunk(
    '@@fetchContent',
    async (getAuth, {extra: api}) => {
     // console.log("asdasd")
      return api.fetchData(getAuth)
    }
  )



  const messagesAdapter = createEntityAdapter();




 const messagesSlice = createSlice({
    name: 'messages',
    initialState:messagesAdapter.getInitialState()  ,
    reducers: {
      setChannels(state, { payload }) {
        // BEGIN (write your solution here)
        const { entities, ids } = payload;
        state.entities = entities;
        state.ids = ids;
        // END
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMessages.pending, (state, action) => {
          //state.loading = 'loading';
         // state.error = null;
        })
        .addCase(fetchMessages.rejected, (state) => {
          //state.loading = 'idle';
         // state.error = 'Something went wrong!'
        })
        .addCase(fetchMessages.fulfilled, (state, action) => {
        //  console.log("Я fetchMessages")
        //  console.log(action.payload)
          state.entities=action.payload.entities.messages;
          state.ids= action.payload.result.messages
         //const {channels} = action.payload.entities
        // const {channels:ids} = action.payload.result
         //console.log(channels, ids)
         //
       
     
      
        })
  
    }
  });
  
  export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages)

  
  export const messageReducer = messagesSlice.reducer;

 