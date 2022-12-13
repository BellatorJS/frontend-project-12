
  import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';




  const modalsAdapter = createEntityAdapter();




 const modalsSlice = createSlice({
    name: 'modals',
    initialState:modalsAdapter.getInitialState(),
    reducers: {
     
      
    },
    extraReducers: (builder) => {
      builder
        .addCase( (state, action) => {
          //state.loading = 'loading';
         // state.error = null;
        })

    }
  });