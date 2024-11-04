import { createSlice, createSelector } from '@reduxjs/toolkit'
import { FOG_LEVELS, FOG_EFFECTS } from '../../lib/constants'

const initialState = {
  level: FOG_LEVELS.DEFAULT,
  effects: [],
  visibility: 'clear',
  lastUpdate: null
}

const fogSlice = createSlice({
  name: 'fog',
  initialState,
  reducers: {
    setFogLevel: (state, action) => {
      state.level = Math.max(
        FOG_LEVELS.MIN,
        Math.min(FOG_LEVELS.MAX, action.payload)
      )
      state.lastUpdate = Date.now()
    },
    increaseFog: (state, action) => {
      state.level = Math.min(FOG_LEVELS.MAX, state.level + action.payload)
      state.lastUpdate = Date.now()
    },
    decreaseFog: (state, action) => {
      state.level = Math.max(FOG_LEVELS.MIN, state.level - action.payload)
      state.lastUpdate = Date.now()
    },
    updateVisibility: (state, action) => {
      state.visibility = action.payload
    },
    addEffect: (state, action) => {
      state.effects.push(action.payload)
    },
    clearEffects: (state) => {
      state.effects = []
    },
    resetFog: () => initialState
  }
})

// Export actions
export const {
  setFogLevel,
  increaseFog,
  decreaseFog,
  updateVisibility,
  addEffect,
  clearEffects,
  resetFog
} = fogSlice.actions

// Selectors
export const selectFogLevel = (state) => state.fog.level
export const selectFogVisibility = (state) => state.fog.visibility

// Memoized selector for current fog effect
export const selectCurrentFogEffect = createSelector(
  selectFogLevel,
  (fogLevel) => {
    return (
      Object.entries(FOG_EFFECTS).find(
        ([_, effect]) => fogLevel >= effect.min && fogLevel <= effect.max
      )?.[1] || FOG_EFFECTS.CLEAR
    )
  }
)

export default fogSlice.reducer
