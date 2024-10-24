import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPuzzleId: 1,
  score: 0,
  inventory: [],
  puzzleHistory: {},
  attempts: 0,
  hintsUsed: 0,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    incrementPuzzle: (state) => {
      state.currentPuzzleId += 1
      state.attempts = 0
      state.hintsUsed = 0
    },
    addScore: (state, action) => {
      state.score += action.payload
    },
    addToInventory: (state, action) => {
      state.inventory.push(action.payload)
    },
    incrementAttempts: (state) => {
      state.attempts += 1
    },
    useHint: (state) => {
      state.hintsUsed += 1
    },
    recordPuzzleCompletion: (state, action) => {
      state.puzzleHistory[state.currentPuzzleId] = {
        completed: true,
        attempts: state.attempts,
        hintsUsed: state.hintsUsed,
        timeCompleted: Date.now(),
      }
    },
    resetGame: (state) => {
      return initialState
    },
  },
})

export const {
  incrementPuzzle,
  addScore,
  addToInventory,
  incrementAttempts,
  useHint,
  recordPuzzleCompletion,
  resetGame,
} = gameSlice.actions

export default gameSlice.reducer
