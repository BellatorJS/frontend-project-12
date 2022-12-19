
  import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import { postSignup } from '../api/routes';


  
 /* export const postlogin = createAsyncThunk(
    '@@login',
    async (value, {extra: api}) => {
      return api.postLogin(value)
    }
  );*/
  export const fetchChannels = createAsyncThunk(
    '@@fetchContent',
    async (getAuth, {extra: api}) => {
      return api.fetchData(getAuth)
    }
  )
  export const createNewUser = createAsyncThunk(
    '@@createNewUser',
    async (values, {
       extra: api
    }) => {
      try {
        return api.postSignup(values);
      } catch(error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return (error)
      }
    },
 
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
        .addCase(createNewUser.pending, (state, action) => {
          console.log(" FAIL postSignup.pending")

        })
        .addCase(createNewUser.rejected, (state, action) => {
         // console.log(action)
        //  console.log(action.error)
        //  console.log(action.error.message)
         const error = 
         (action.error.message === "Request failed with status code 409")
         ? 'Такой пользователь уже существует'
         : 'Непредвиденная ошибка решистрации'

          state.error = error
        
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