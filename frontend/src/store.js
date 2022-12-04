import { configureStore } from "@reduxjs/toolkit";

//import {filterReducer} from './features/Filters/filter-slice';
import {chatReducer} from './feachers/dataSlice';
import * as api from './api/routes';

export const store = configureStore({
  reducer: {
    chats: chatReducer,

  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  })
});


