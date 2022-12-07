import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cleaners: [],
  isLoading: false,
  error: null,
};

export const cleanerSlice = createSlice({
  name: 'cleaner',
  initialState,
  reducers: {
    GET_CLEANER_LOADING: (state) => {
      state.isLoading = true;
    },
    GET_CLEANER_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.cleaners = action.payload.cleaners;
    },
    GET_CLEANER_FAIL: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const {GET_CLEANER_LOADING, GET_CLEANER_FAIL, GET_CLEANER_SUCCESS} = cleanerSlice.actions;

export default cleanerSlice.reducer;