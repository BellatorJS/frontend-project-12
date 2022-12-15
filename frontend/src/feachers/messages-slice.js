
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
    initialState:messagesAdapter.getInitialState(),
    reducers: {
      messageAdded: messagesAdapter.addOne,
    
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(channelRemoved, (state, action) => {
          console.log(action.payload)
       
       const cccc=  produce(state.entities, draft => {

          for (const x in draft) {
           if (draft[x].channelId == action.payload ) {
            console.log(draft)
            console.log("DELETE", draft)
            delete draft[x]
           }
         
         
          }
       // return Object.values(draft).filter((x) => x.channelId !== action.payload)
          
         })
messagesAdapter.setAll(state, cccc)
         // console.log(action.payload, "action.payload")
         
          /*
                ;
      // Выбираем все комментарии кроме тех, что нужно удалить
      const restEntities = Object.values(state.entities);
      // setAll удаляет текущие сущности и добавляет новые
      postCommentsAdapter.setAll(state, restEntities);


      */














          //const removedID= action.payload;
          //const removingMsg = state.messages.entities.filter((m=>m.channelId === removedID))
 
         //const restMsgs = Object.values(state.messages.entities).filter((e) => e.postId !== postId);
         // setAll удаляет текущие сущности и добавляет новые
         //postCommentsAdapter.setAll(state, restMsgs);


        })
  
    }
  });
  
  //const item = useSelector((state) => messagesSelectors.selectById(state, id));

  export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages)

  export const {messageAdded} = messagesSlice.actions
  
  export const messageReducer = messagesSlice.reducer;

 