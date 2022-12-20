import { configureStore } from "@reduxjs/toolkit";

import {channelsReducer} from './feachers/channels-slice';
import {messageReducer} from './feachers/messages-slice'


export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages:messageReducer,
  },
  devTools: true,

});


