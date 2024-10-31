// src/store/gameSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Core game progress
  currentPuzzleId: 1,
  puzzlesCompleted: {},
  score: 0,

  // Game environment
  fogLevel: 50,

  // Player inventory/achievements
  inventory: [],
  unlockedHints: [],

  // Game status
  isGameStarted: false,
  isGameComplete: false,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Puzzle progress
    completePuzzle: (state, action) => {
      const { puzzleId, timeCompleted, hintsUsed } = action.payload
      state.puzzlesCompleted[puzzleId] = {
        timeCompleted,
        hintsUsed,
      }
      state.currentPuzzleId++
    },

    // Fog mechanics
    updateFogLevel: (state, action) => {
      state.fogLevel = Math.max(0, Math.min(100, action.payload))
    },

    // Inventory management
    addToInventory: (state, action) => {
      state.inventory.push(action.payload)
    },

    // Game state
    startGame: (state) => {
      state.isGameStarted = true
    },

    completeGame: (state) => {
      state.isGameComplete = true
    },

    // Score updates
    updateScore: (state, action) => {
      state.score += action.payload
    },

    // Reset game
    resetGame: (state) => {
      return initialState
    },
  },
})

export const {
  completePuzzle,
  updateFogLevel,
  addToInventory,
  startGame,
  completeGame,
  updateScore,
  resetGame,
} = gameSlice.actions

export default gameSlice.reducer
