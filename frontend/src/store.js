import { configureStore } from "@reduxjs/toolkit";

//import {filterReducer} from './features/Filters/filter-slice';
import {channelsReducer} from './feachers/channels-slice';
import {messageReducer} from './feachers/messages-slice'
import * as api from './api/routes';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages:messageReducer,

  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  })
});


