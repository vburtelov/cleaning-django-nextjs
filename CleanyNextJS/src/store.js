import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cleanerReducer from './slices/cleanerSlice'
import orderReducer from './slices/orderSlice'
import promoReducer from './slices/promoSlice'
import typeReducer from './slices/typeSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cleaner: cleanerReducer,
    order: orderReducer,
    promo: promoReducer,
    types: typeReducer,
  },
})