import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cleanerReducer from './slices/cleanerSlice'
import orderReducer from './slices/orderSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cleaner: cleanerReducer,
    order: orderReducer
  },
})