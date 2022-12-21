import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { channelRemoved } from './channels-slice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    messageAdded: messagesAdapter.addOne,
    setFetchedMessages: (state, action) => {
      const { messages: entities } = action.payload;
      messagesAdapter.setAll(state, entities);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelRemoved, (state, action) => {
        const channelId = action.payload;
        const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export const { messageAdded, setFetchedMessages } = messagesSlice.actions;

export const messageReducer = messagesSlice.reducer;
