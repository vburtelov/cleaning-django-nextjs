import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  types: [],
  isLoading: false,
  error: null,
};

export const typeSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    GET_TYPES_LOADING: (state) => {
        state.isLoading = true;
    },
    GET_TYPES_SUCCESS: (state, action) => {
        state.isLoading = false;
        state.types = action.payload.types;
    },
    GET_TYPES_FAIL: (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
    }
  },
});

export const {GET_TYPES_LOADING, GET_TYPES_SUCCESS, GET_TYPES_FAIL} = typeSlice.actions;

export default typeSlice.reducer;