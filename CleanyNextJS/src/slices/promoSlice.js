import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  promos: [],
  isLoading: false,
  error: null,
};

export const promoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {
    GET_PROMO_LOADING: (state) => {
        state.isLoading = true;
    },
    GET_PROMO_SUCCESS: (state, action) => {
        state.isLoading = false;
        state.promos = action.payload.promos;
    },
    GET_PROMO_FAIL: (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
    }
  },
});

export const {GET_PROMO_LOADING, GET_PROMO_SUCCESS, GET_PROMO_FAIL} = promoSlice.actions;

export default promoSlice.reducer;