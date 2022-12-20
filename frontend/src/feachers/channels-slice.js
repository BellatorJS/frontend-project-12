
  import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';


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



 const channelsSlice = createSlice({
    name: 'channels',
    initialState: chatAdapter.getInitialState(
    ),
    reducers: {
      channelAdded:   chatAdapter.addOne,
      channelRemoved: chatAdapter.removeOne,
      channelUpdated: chatAdapter.updateOne,
      setChannel(state, { payload }) {
        state.currentChannelId = payload;
      },
  
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchChannels.fulfilled, (state, action) => {
          state.entities = action.payload.entities.channels;
          state.ids = action.payload.result.channels;
          state.currentChannelId = action.payload.result.currentChannelId
        })
  
    }
  });
  
  export const channelsSelectors = chatAdapter.getSelectors((state) => state.channels);







  export const {channelAdded ,channelUpdated, channelRemoved, setChannel} = channelsSlice.actions
  //export const currentChannelSelectors = chatAdapter.getSelectors((state) => state.chats)
  
  export const channelsReducer = channelsSlice.reducer;

/* export const {
    selectById: selectUserById,
    selectIds: selectUserIds,
    selectEntities: selectUserEntities,
    selectAll: selectAllUsers,
    selectTotal: selectTotalUsers
  } = usersAdapter.getSelectors(state => state.users)*/