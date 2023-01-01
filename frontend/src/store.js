import { configureStore } from '@reduxjs/toolkit';
import { channelsReducer } from './slices/channels-slice';
import { messageReducer } from './slices/messages-slice';
import { modalsReducer } from './slices/modals-slice';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messageReducer,
    modals: modalsReducer,
  },
  devTools: true,
});
export default store;
