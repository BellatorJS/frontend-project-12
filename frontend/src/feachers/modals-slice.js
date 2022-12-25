/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.extra = payload.extra;
      state.isOpened = !state.isOpened;
    },
    onHide: (state) => {
      state.isOpened = !state.isOpened;
      state.type = null;
    },
  },

});

export const { showModal, onHide } = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
