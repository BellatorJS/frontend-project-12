/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import { channelsReducer } from './feachers/channels-slice';
import { messageReducer } from './feachers/messages-slice';
import { modalsReducer } from './feachers/modals-slice';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messageReducer,
    modals: modalsReducer,
  },
  devTools: true,
});
