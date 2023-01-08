/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    currentChannelId: '1',
  }),
  reducers: {
    channelAdded: channelsAdapter.addOne,
    channelRemoved: channelsAdapter.removeOne,
    channelUpdated: channelsAdapter.updateOne,
    setChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    setFetchedChannels: (state, { payload }) => {
      const { channels: entities, currentChannelId } = payload;
      channelsAdapter.setAll(state, entities);
      state.currentChannelId = currentChannelId;
    },

  },

});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const channelIdSelector = ((state) => state.channels.currentChannelId);
export const {
  channelAdded,
  setFetchedChannels,
  channelUpdated,
  channelRemoved,
  setChannel,
} = channelsSlice.actions;
export const channelsReducer = channelsSlice.reducer;
