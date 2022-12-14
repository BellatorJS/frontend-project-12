
  import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
  import {channelsSelectors,channelAdded, channelRemoved, channelUpdated} from '../feachers/channels-slice'


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
    initialState:messagesAdapter.getInitialState(),
    reducers: {
      messageAdded: messagesAdapter.addOne,
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(channelRemoved, (state, action) => {
          //const removedID= action.payload;
          //const removingMsg = state.messages.entities.filter((m=>m.channelId === removedID))
          console.log(state.messages.entities)
          console.log(messagesAdapter.messages.entities)
         //const restMsgs = Object.values(state.messages.entities).filter((e) => e.postId !== postId);
         // setAll удаляет текущие сущности и добавляет новые
         //postCommentsAdapter.setAll(state, restMsgs);


        })
  
    }
  });
  
  export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages)

  export const {messageAdded} = messagesSlice.actions
  
  export const messageReducer = messagesSlice.reducer;

 