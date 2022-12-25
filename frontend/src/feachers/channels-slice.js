/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const chatAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: chatAdapter.getInitialState({
    currentChannelId: '1',
  }),
  reducers: {
    channelAdded: chatAdapter.addOne,
    channelRemoved: chatAdapter.removeOne,
    channelUpdated: chatAdapter.updateOne,
    setChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    setFetchedChannels: (state, { payload }) => {
      const { channels: entities, currentChannelId } = payload;
      chatAdapter.setAll(state, entities);
      state.currentChannelId = currentChannelId;
    },

  },

});

export const channelsSelectors = chatAdapter.getSelectors((state) => state.channels);

export const {
  channelAdded, setFetchedChannels, channelUpdated, channelRemoved, setChannel,
} = channelsSlice.actions;

export const channelsReducer = channelsSlice.reducer;

/* export const {
    selectById: selectUserById,
    selectIds: selectUserIds,
    selectEntities: selectUserEntities,
    selectAll: selectAllUsers,
    selectTotal: selectTotalUsers
  } = usersAdapter.getSelectors(state => state.users) */
