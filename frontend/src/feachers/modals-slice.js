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
    addModal1: (state, action) => {
      state.type = action.payload.type;
      state.extra = action.payload.extra;
      state.isOpened = !state.isOpened;
    },
    onHide: (state) => {
      state.isOpened = !state.isOpened;
      state.type = null;
    },
  },

});

export const { addModal1, onHide } = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;

/*
modal: {
    isOpened: true,
    type: 'removeChannel',
    extra: {
      channelId: 4
    }
  }
}
} */
