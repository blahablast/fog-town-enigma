import { configureStore } from '@reduxjs/toolkit'

import fogReducer from './slices/fogSlice'

export const store = configureStore({
  reducer: {
    fog: fogReducer
  }
})
