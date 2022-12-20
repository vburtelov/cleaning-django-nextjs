import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  access: null,
  refresh: null,
  isAuthenticated: false,
  isLoading: false,
  me: null,
  appLoaded: false,
  success: {
    editPassword: null,
    editUser: null,
    register: null,
    verify: null,
  },
  errors: {
    login: null,
    register: null,
    logout: null,
    verify: null,
    me: null,
    editPassword: null,
    editUser: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    VERIFY_TOKEN_LOADING: (state) => {
      state.isLoading = true;
      state.errors = initialState.errors;
      state.appLoaded = false;
      state.success = initialState.success;
    },
    VERIFY_TOKEN_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.appLoaded = true;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.errors = initialState.errors;
      state.success = initialState.success;
    },
    VERIFY_TOKEN_FAIL: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.appLoaded = true;
      state.errors.verify = action.payload;
      state.access = null;
      state.refresh = null;
      state.success = initialState.success;
      state.errors = initialState.errors;
    },

    ME_LOADING: (state) => {
      state.isLoading = true;
      state.appLoaded = false;
      state.errors = initialState.errors;
      state.success = initialState.success;
    },
    LOGIN_WITH_EMAIL_LOADING: (state) => {
      state.isLoading = true;
      state.appLoaded = false;
      state.errors = initialState.errors;
      state.success = initialState.success;
    },
    LOGIN_WITH_EMAIL_SUCCESS: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.errors = initialState.errors;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.appLoaded = true;
      state.success = initialState.success;
    },
    ME_FAIL: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.me = null;
      state.errors.me = action.payload;
      state.appLoaded = true;
      state.success = initialState.success;
    },
    ME_SUCCESS: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.me = action.payload;
      state.errors = initialState.errors;
      state.appLoaded = true;
      state.success = initialState.success;
    },
    EMAIL_VERIFY_LOADING: (state) => {
        state.isLoading = true;
        state.appLoaded = false;
        state.errors = initialState.errors;
        state.success = initialState.success;
    },
    EMAIL_VERIFY_SUCCESS: (state, action) => {
        state.isLoading = false;
        state.appLoaded = true;
        state.errors = initialState.errors;
        state.success.verify = true;
    },
    EMAIL_VERIFY_FAIL: (state, action) => {
        state.isLoading = false;
        state.appLoaded = true;
        state.errors.verify = action.payload;
        state.success = initialState.success;
    },
    LOGOUT_SUCCESS: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.me = null;
      state.errors = initialState.errors;
      state.access = null;
      state.refresh = null;
      state.appLoaded = true;
      state.success = initialState.success;
    },
    LOGOUT_FAIL: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.me = null;
      state.errors.logout = action.payload;
      state.appLoaded = true;
      state.success = initialState.success;
    },
    LOGOUT_LOADING: (state) => {
      state.isLoading = true;
      state.errors = initialState.errors;
      state.appLoaded = false;
      state.success = initialState.success;
    },
    LOGIN_WITH_EMAIL_FAIL: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.me = null;
      state.errors.login = action.payload.detail;
      state.appLoaded = true;
      state.success = initialState.success;
    },
    USER_EDIT_LOADING: (state) => {
      state.isLoading = true;
      state.errors = initialState.errors;
      state.appLoaded = false;
      state.success = initialState.success;
    },
    USER_EDIT_SUCCESS: (state, action) => {
      state.me = action.payload;
      state.isLoading = false;
      state.errors = initialState.errors;
      state.appLoaded = true;
      state.success.editUser = 'Пользователь успешно изменен';
    },
    USER_EDIT_FAIL: (state, action) => {
      state.isLoading = false;
      state.errors.edit = action.payload;
      state.appLoaded = true;
      state.success = initialState.success;
    },
    USER_PASSWORD_CHANGE_LOADING: (state) => {
      state.isLoading = true;
      state.errors = initialState.errors;
      state.appLoaded = false;
      state.success.editPassword = null;
      state.success = initialState.success;
    },
    USER_PASSWORD_CHANGE_SUCCESS: (state) => {
      state.isLoading = false;
      state.errors = initialState.errors;
      state.appLoaded = true;
      state.success.editPassword = 'Пароль успешно изменен';
    },
    USER_PASSWORD_CHANGE_FAIL: (state, action) => {
      state.isLoading = false;
      state.errors.editPassword = action.payload;
      state.appLoaded = true;
      state.success = initialState.success;
    },
    REGISTER_LOADING: (state) => {
      state.isLoading = true;
      state.errors = initialState.errors;
      state.appLoaded = false;
      state.success = initialState.success;
    },
    REGISTER_SUCCESS: (state) => {
      state.isLoading = false;
      state.errors = initialState.errors;
      state.appLoaded = true;
      state.success.register = true;
    },
    REGISTER_FAIL: (state, action) => {
      state.isLoading = false;
      state.errors.register = action.payload;
      state.appLoaded = true;
      state.success = initialState.success;
    }
  },
});

export const {
  ME_LOADING,
  LOGIN_WITH_EMAIL_LOADING,
  LOGIN_WITH_EMAIL_SUCCESS,
  ME_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_WITH_EMAIL_FAIL,
  ME_SUCCESS,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_LOADING,
  VERIFY_TOKEN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_LOADING,
  USER_EDIT_FAIL,
  USER_EDIT_LOADING,
  USER_EDIT_SUCCESS,
  USER_PASSWORD_CHANGE_FAIL,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_PASSWORD_CHANGE_LOADING,
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  EMAIL_VERIFY_LOADING,
  EMAIL_VERIFY_SUCCESS,
  EMAIL_VERIFY_FAIL
} = authSlice.actions;

export default authSlice.reducer;