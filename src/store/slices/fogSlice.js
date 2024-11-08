import { createSlice, createSelector } from '@reduxjs/toolkit'

const fogSlice = createSlice({
  name: 'fog',
  reducers: {
    setFogLevel: (state, action) => {
      state.level = Math.max(
        FOG_LEVELS.MIN,
        Math.min(FOG_LEVELS.MAX, action.payload)
      )
    },
    increaseFog: (state, action) => {
      state.level = Math.min(FOG_LEVELS.MAX, state.level + action.payload)
    },
    decreaseFog: (state, action) => {
      state.level = Math.max(FOG_LEVELS.MIN, state.level - action.payload)
    }
  }
})

// Export actions
export const { setFogLevel, increaseFog, decreaseFog } = fogSlice.actions

// Selector for fog level
export const selectFogLevel = (state) => state.fog.level

// Selector to get the current fog effect based on fog level
export const selectCurrentFogEffect = createSelector(
  selectFogLevel,
  (fogLevel) => {
    return (
      Object.values(FOG_EFFECTS).find(
        (effect) => fogLevel >= effect.min && fogLevel <= effect.max
      ) || FOG_EFFECTS.CLEAR
    )
  }
)

export default fogSlice.reducer
