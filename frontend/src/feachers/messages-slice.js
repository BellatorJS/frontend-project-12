
  import {createSlice, current, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
  import {channelsSelectors,channelAdded, channelRemoved, channelUpdated} from '../feachers/channels-slice'
  import { useSelector } from 'react-redux';
  import produce from "immer"


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
    initialState:messagesAdapter.getInitialState({
      status: 'idle', // or: 'loading', 'succeeded', 'failed'
      error : null

    }),
    reducers: {
      messageAdded: messagesAdapter.addOne, 
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchMessages.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Something went wrong!'
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        console.log(action.payload.entities.messages)
        state.entities=action.payload.entities.messages;
        state.ids= action.payload.result.messages
      })
        .addCase(channelRemoved, (state, action) => {   
       const msg=  produce(state.entities, draft => {
          for (const x in draft) {
           if (draft[x].channelId === action.payload ) {

            delete draft[x]
           }}
          
         })
messagesAdapter.setAll(state, msg)



        })
  
    }
  });


  export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages)

  export const {messageAdded} = messagesSlice.actions
  
  export const messageReducer = messagesSlice.reducer;

 