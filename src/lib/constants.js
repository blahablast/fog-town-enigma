export const FOG_LEVELS = {
  MIN: 0,
  MAX: 100,
  DEFAULT: 50,
}

export const GAME_SETTINGS = {
  HINT_COST: 5, // Fog level increase for using a hint
  PUZZLE_TIMEOUT: 300, // Time limit for puzzles in seconds
  MAX_ATTEMPTS: 3, // Maximum attempts per puzzle before penalty
}

export const REWARDS = {
  PERFECT_SOLVE: 10, // Points for solving without hints
  WITH_HINT: 5, // Points for solving with hints
  TIME_BONUS: 3, // Extra points for solving under half time
}

export const FOG_EFFECTS = {
  CLEAR: {
    min: 0,
    max: 30,
    visibility: 'clear',
    hintCost: 3,
  },
  MISTY: {
    min: 31,
    max: 60,
    visibility: 'misty',
    hintCost: 5,
  },
  DENSE: {
    min: 61,
    max: 100,
    visibility: 'dense',
    hintCost: 7,
  },
}
