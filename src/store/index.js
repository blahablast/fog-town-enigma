import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './slices/boardSlice'
import fogReducer from './slices/fogSlice'

export const store = configureStore({
  reducer: {
    board: boardReducer,
    fog: fogReducer
  }
})
