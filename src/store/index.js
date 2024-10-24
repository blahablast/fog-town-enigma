import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './slices/gameSlice'
import fogReducer from './slices/fogSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    fog: fogReducer,
  },
})
