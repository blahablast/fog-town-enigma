import { createSlice } from '@reduxjs/toolkit'
import { FOG_LEVELS } from '../../lib/constants'

const initialState = {
  level: FOG_LEVELS.DEFAULT,
  effects: [],
  visibility: 'clear',
}

export const fogSlice = createSlice({
  name: 'fog',
  initialState,
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
  },
})

export const {
  setFogLevel,
  increaseFog,
  decreaseFog,
  updateVisibility,
  addEffect,
  clearEffects,
} = fogSlice.actions

export default fogSlice.reducer
