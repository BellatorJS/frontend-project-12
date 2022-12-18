
  import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import { postSignup } from '../api/routes';


  
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
  export const createNewUser = createAsyncThunk(
    '@@createNewUser',
    async (values, {
      rejectWithValue, extra: api
    }) => {
      try {
        console.log("AAAAAAAAAAAA")
        return api.postSignup(values);
      } catch(err) {
        console.log(err)
        return rejectWithValue('Failed to fetch all todos.')
      }
    },
    {
      condition: (_, {getState, extra}) => {
        const {loading} = getState().todos;
  
        if (loading === 'loading') {
          return false;
        }
      }
    }
  );





  const chatAdapter = createEntityAdapter(/*{
    selectId:(channel)=>channel.id
  }*/
    
  )



 const channelsSlice = createSlice({
    name: 'channels',
    initialState: chatAdapter.getInitialState({
      error:""
    }
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
        .addCase(createNewUser.pending, (state, action) => {
          console.log(" FAIL postSignup.pending")

        })
        .addCase(createNewUser.rejected, (state) => {
          console.log("Такой пользователь уже существует")
          state.error = 'Такой пользователь уже существует'
        
        })
        .addCase(createNewUser.fulfilled, (state, action) => {
          state.error = 'Something went wrong!'
          console.log("FAIL!!!!!!!!!")
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
         
          state.entities = action.payload.entities.channels;
          //state.entities.channels.messages =[]
          state.ids = action.payload.result.channels;
          state.currentChannelId = action.payload.result.currentChannelId
    // console.log(state.entities)
      
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