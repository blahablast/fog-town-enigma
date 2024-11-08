import { createSlice } from '@reduxjs/toolkit'

const FOG_EFFECTS = {
  CLEAR: { min: 0, max: 30, visibility: 'clear' },
  MISTY: { min: 31, max: 60, visibility: 'misty' },
  DENSE: { min: 61, max: 100, visibility: 'dense' }
}

const initialState = {
  level: 50, // Start with a medium fog level
  visibility: 'misty' // Starting effect visibility
}

const fogSlice = createSlice({
  name: 'fog',
  initialState,
  reducers: {
    increaseFog: (state, action) => {
      state.level = Math.min(100, state.level + action.payload)
      state.visibility = getFogVisibility(state.level)
    },
    decreaseFog: (state, action) => {
      state.level = Math.max(0, state.level - action.payload)
      state.visibility = getFogVisibility(state.level)
    },
    resetFog: () => initialState
  }
})

// Helper function to determine visibility based on fog level
function getFogVisibility(fogLevel) {
  if (fogLevel >= FOG_EFFECTS.DENSE.min) return FOG_EFFECTS.DENSE.visibility
  if (fogLevel >= FOG_EFFECTS.MISTY.min) return FOG_EFFECTS.MISTY.visibility
  return FOG_EFFECTS.CLEAR.visibility
}

// Export actions and reducer
export const { increaseFog, decreaseFog, resetFog } = fogSlice.actions
export default fogSlice.reducer
