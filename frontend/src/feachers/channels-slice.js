
  import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';


  
  export const postlogin = createAsyncThunk(
    '@@login',
    async (value, {extra: api}) => {
      return api.postLogin(value)
    }
  );
  export const fetchChannels = createAsyncThunk(
    '@@fetchContent',
    async (getAuth, {extra: api}) => {
      return api.fetchData(getAuth)
    }
  )



  const chatAdapter = createEntityAdapter(/*{
    selectId:(channel)=>channel.id
  }*/
    
  )



 const chatSlice = createSlice({
    name: 'channels',
    initialState: chatAdapter.getInitialState(
    ),
    reducers: {
      channelAdded:   chatAdapter.addOne,
      channelRemoved: chatAdapter.removeOne,
      channelUpdated: chatAdapter.updateOne,
      setChannel(state, { payload }) {
        console.log(payload)
        state.currentChannelId = payload;
  
      },
  
    },
    extraReducers: (builder) => {
      builder
        .addCase(postlogin.pending, (state, action) => {
          state.loading = 'loading';
          state.error = null;
        })
        .addCase(postlogin.rejected, (state) => {
          state.loading = 'idle';
          state.error = 'Something went wrong!'
        })
        .addCase(postlogin.fulfilled, (state, action) => {
          //chatAdapter.addMany(state, action.payload);
        })
        .addCase(fetchChannels.pending, (state, action) => {
          state.loading = 'loading';
          state.error = null;
        })
        .addCase(fetchChannels.rejected, (state) => {
          state.loading = 'idle';
          state.error = 'Something went wrong!'
        })
        .addCase(fetchChannels.fulfilled, (state, action) => {
         
          state.entities=action.payload.entities.channels;
          state.ids= action.payload.result.channels;
          state.currentChannelId = action.payload.result.currentChannelId
    // console.log(state.entities)
      
        })
  
    }
  });
  
  export const channelsSelectors = chatAdapter.getSelectors((state) => state.chats);


  export const {channelAdded ,channelUpdated, channelRemoved, setChannel} = chatSlice.actions
  //export const currentChannelSelectors = chatAdapter.getSelectors((state) => state.chats)
  
  export const chatReducer = chatSlice.reducer;

/* export const {
    selectById: selectUserById,
    selectIds: selectUserIds,
    selectEntities: selectUserEntities,
    selectAll: selectAllUsers,
    selectTotal: selectTotalUsers
  } = usersAdapter.getSelectors(state => state.users)*/