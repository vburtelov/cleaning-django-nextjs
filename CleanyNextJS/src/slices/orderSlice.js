import { createSlice } from '@reduxjs/toolkit';
import { getCookie, getCookies } from 'cookies-next';

const cookies = getCookies();
const decodedCookies = Object.keys(cookies).reduce((acc, key) => {
  acc[key] = decodeURIComponent(cookies[key]);
  return acc;
}, {});


const initialState = {
  available_times: null,
  available_frequencies: null,
  available_types: null,
  orders: null,

  city: decodedCookies.city || null,
  street: decodedCookies.street || null,
  house: decodedCookies.house || null,
  apartment: decodedCookies.apartment || null,
  date: decodedCookies.date || null,
  time: Number(decodedCookies.time) || null,

  type: Number(decodedCookies.type) || null,
  frequency: Number(decodedCookies.frequency) || null,

  square: Number(decodedCookies.square) || null,

  cleaner: Number(decodedCookies.cleaner) || null,

  payment_method: decodedCookies.payment_method || null,

  discount_code: decodedCookies.discount_code || null,
  discount_id: null,

  isLoading: false,
  errors: {
    general: false,
    cleaning: false,
    payment: false,
  },
  success: {
    general: false,
    cleaning: false,
    payment: false,
  },
  isSubmitted : false,
  steps: {
    general: getCookie('steps_general') || false,
    cleaning: getCookie('steps_cleaning') || false,
    payment: getCookie('steps_payment') || false,
  },
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    SET_ORDER_PAYMENT_LOADING: (state) => {
      state.isLoading = true;
      state.errors = initialState.errors;
      state.success = initialState.success;
    },
    SET_ORDER_PAYMENT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.payment_method = action.payload.payment_method;
      state.discount_code = action.payload.discount_code;
      state.discount_id = action.payload.id;
      state.steps.payment = true;
    },
    SET_ORDER_PAYMENT_FAIL: (state, action) => {
      state.isLoading = false;
      state.errors.payment = action.payload;
      state.success = initialState.success;
    },
    SET_ORDER_GENERAL_LOADING: (state) => {
      state.isLoading = true;
      state.errors = initialState.errors;
      state.success = initialState.success;
      state.isSubmitted = false;
    },
    SET_ORDER_GENERAL_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.errors = initialState.errors;
      state.success.general = true;
      state.city = action.payload.city;
      state.street = action.payload.street;
      state.house = action.payload.house;
      state.apartment = action.payload.apartment;
      state.date = action.payload.date;
      state.time = action.payload.time;
      state.square = action.payload.square;
      state.steps.general = true;
    },
    SET_ORDER_GENERAL_FAIL: (state, action) => {
      state.isLoading = false;
      state.errors.general = action.payload;
      state.success = initialState.success;
    },
    SET_ORDER_CLEANING_LOADING: (state) => {
      state.isLoading = true;
      state.errors = initialState.errors;
      state.success = initialState.success;
      state.isSubmitted = false;
    },
    SET_ORDER_CLEANING_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.errors = initialState.errors;
      state.success.cleaning = true;
      state.type = action.payload.type;
      state.frequency = action.payload.frequency;
      state.cleaner = action.payload.cleaner;
      state.steps.cleaning = true;
    },
    SET_ORDER_CLEANING_FAIL: (state, action) => {
      state.isLoading = false;
      state.errors.cleaning = action.payload;
      state.success = initialState.success;
    },

    GET_ORDER_AVAILABLE_TIME_LOADING: (state) => {
      state.isLoading = true;
      state.success = initialState.success;
    },
    GET_ORDER_AVAILABLE_TIME_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.available_times = action.payload;
    },
    GET_ORDER_AVAILABLE_TIME_FAIL: (state) => {
      state.isLoading = false;
    },

    GET_ORDER_AVAILABLE_TYPE_LOADING: (state) => {
      state.isLoading = true;
      state.success = initialState.success;
    },
    GET_ORDER_AVAILABLE_TYPE_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.available_types = action.payload;
    },
    GET_ORDER_AVAILABLE_TYPE_FAIL: (state) => {
      state.isLoading = false;
    },
    GET_ORDER_AVAILABLE_FREQUENCY_LOADING: (state) => {
      state.isLoading = true;
      state.success = initialState.success;
    },
    GET_ORDER_AVAILABLE_FREQUENCY_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.available_frequencies = action.payload;
    },
    GET_ORDER_AVAILABLE_FREQUENCY_FAIL: (state) => {
      state.isLoading = false;
    },

    CREATE_ORDER_LOADING: (state) => {
      state.isLoading = true;
      state.errors = initialState.errors;
      state.success = initialState.success;
      state.isSubmitted = false;
    },
    CREATE_ORDER_SUCCESS: (state) => {
      state.isLoading = false;
      state.errors = initialState.errors;
      state.success = initialState.success;
      state.steps.general = false;
      state.steps.cleaning = false;
      state.steps.payment = false;
      state.city = initialState.city;
      state.street = initialState.street;
      state.house = initialState.house;
      state.apartment = initialState.apartment;
      state.date = initialState.date;
      state.time = initialState.time;
      state.type = initialState.type;
      state.frequency = initialState.frequency;
      state.square = initialState.square;
      state.cleaner = initialState.cleaner;
      state.payment_method = null;
      state.discount_code = null;
      state.success.payment = true;
      state.success.payment = false;
      state.isSubmitted = true;
    },
    CREATE_ORDER_FAIL: (state, action) => {
      state.isLoading = false;
      state.errors.payment = action.payload;
      state.success = initialState.success;
      state.isSubmitted = false;
    },

    GET_ORDERS_LOADING: (state) => {
      state.isLoading = true;
      state.errors = initialState.errors;
      state.success = initialState.success;
    },

    GET_ORDERS_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },

    GET_ORDERS_FAIL: (state) => {
      state.isLoading = false;
    },

    CLEAR_SUCCESS: (state) => {
      state.success = initialState.success;
    },
  },
});

export const {
  GET_ORDER_AVAILABLE_TIME_FAIL,
  GET_ORDER_AVAILABLE_TIME_LOADING,
  GET_ORDER_AVAILABLE_TIME_SUCCESS,
  SET_ORDER_GENERAL_FAIL,
  SET_ORDER_GENERAL_LOADING,
  SET_ORDER_GENERAL_SUCCESS,
  GET_ORDER_AVAILABLE_TYPE_FAIL,
  GET_ORDER_AVAILABLE_TYPE_LOADING,
  GET_ORDER_AVAILABLE_TYPE_SUCCESS,
  GET_ORDER_AVAILABLE_FREQUENCY_FAIL,
  GET_ORDER_AVAILABLE_FREQUENCY_LOADING,
  GET_ORDER_AVAILABLE_FREQUENCY_SUCCESS,
  SET_ORDER_CLEANING_FAIL,
  SET_ORDER_CLEANING_LOADING,
  SET_ORDER_CLEANING_SUCCESS,
  SET_ORDER_PAYMENT_FAIL,
  SET_ORDER_PAYMENT_SUCCESS,
  SET_ORDER_PAYMENT_LOADING,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
  CLEAR_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_LOADING,
  GET_ORDERS_SUCCESS,

} = orderSlice.actions;

export default orderSlice.reducer;