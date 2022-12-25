import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { channelRemoved } from './channels-slice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    messageAdded: messagesAdapter.addOne,
    setFetchedMessages: (state, { payload }) => {
      const { messages: entities } = payload;
      messagesAdapter.setAll(state, entities);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelRemoved, (state, { payload }) => {
        const channelId = payload;
        const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export const { messageAdded, setFetchedMessages } = messagesSlice.actions;

export const messageReducer = messagesSlice.reducer;
