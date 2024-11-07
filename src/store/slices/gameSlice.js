import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPuzzle } from '../../lib/puzzles'
import { increaseFog, decreaseFog } from './fogSlice'
import { FOG_LEVELS, REWARDS } from '../../lib/constants'

const initialState = {
  currentPuzzleId: 1,
  puzzlesCompleted: {},
  score: 0,
  isGameStarted: false,
  isGameComplete: false
}

export const completePuzzleAsync = createAsyncThunk(
  'game/completePuzzleAsync',
  async ({ puzzleId, answer, hintsUsed }, { dispatch, getState }) => {
    const puzzle = getPuzzle(puzzleId)

    // Simulated verification logic (this will be replaced with blockchain interaction)
    if (answer.toLowerCase().trim() === puzzle.answer.toLowerCase().trim()) {
      dispatch(
        completePuzzle({ puzzleId, timeCompleted: Date.now(), hintsUsed })
      )

      const fogChange = puzzle.fogImpact.change
      if (fogChange > 0) {
        dispatch(increaseFog(fogChange))
      } else {
        dispatch(decreaseFog(Math.abs(fogChange)))
      }

      const rewardPoints = hintsUsed ? REWARDS.WITH_HINT : REWARDS.PERFECT_SOLVE
      dispatch(updateScore(rewardPoints))

      return { success: true }
    } else {
      return { success: false, error: 'Incorrect solution' }
    }
  }
)

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    completePuzzle: (state, action) => {
      const { puzzleId, timeCompleted, hintsUsed } = action.payload
      state.puzzlesCompleted[puzzleId] = { timeCompleted, hintsUsed }
      state.currentPuzzleId++
    },
    updateScore: (state, action) => {
      state.score += action.payload
    }
  }
})

export const { completePuzzle, updateScore } = gameSlice.actions
export default gameSlice.reducer
