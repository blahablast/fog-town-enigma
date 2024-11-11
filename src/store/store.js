import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer
  }
})

const Cell = ({ color }) => (
  <div
    className={`${styles.tetrisCell} ${color ? styles[color] : 'bg-gray-800'}`}
  />
)

export default Cell
