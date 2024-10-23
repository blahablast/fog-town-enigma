// src/lib/puzzles.js

// Puzzle Types
const PuzzleType = {
  RIDDLE: 'RIDDLE',
  SEQUENCE: 'SEQUENCE',
  WORD: 'WORD',
  CIPHER: 'CIPHER',
}

// Difficulty Levels
const DifficultyLevel = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
}

// Puzzle Collection
const puzzles = [
  {
    id: 1,
    type: PuzzleType.RIDDLE,
    difficulty: DifficultyLevel.EASY,
    question:
      'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. I have roads, but no cars. What am I?',
    answer: 'map',
    hint: 'People use me to find their way',
    fogImpact: {
      min: 0, // Minimum fog level required to see this puzzle
      max: 70, // Maximum fog level at which puzzle is still visible
      change: 5, // How much solving this puzzle changes the fog level
    },
    reward: {
      item: 'Old Compass',
      description: 'A rusted compass that might prove useful later',
    },
  },
  {
    id: 2,
    type: PuzzleType.SEQUENCE,
    difficulty: DifficultyLevel.MEDIUM,
    question: 'What number comes next: 2, 3, 5, 9, 17, __',
    answer: '33',
    hint: 'Each number is transformed by a specific operation',
    fogImpact: {
      min: 20,
      max: 80,
      change: -10,
    },
    reward: {
      item: 'Fog Lamp',
      description: 'Helps illuminate through dense fog',
    },
  },
]

// Helper Functions
export function getPuzzle(id) {
  return puzzles.find((puzzle) => puzzle.id === id)
}

export function checkAnswer(id, answer) {
  const puzzle = getPuzzle(id)
  if (!puzzle) return false
  return puzzle.answer.toLowerCase() === answer.toLowerCase().trim()
}

export function getPuzzlesByDifficulty(difficulty) {
  return puzzles.filter((puzzle) => puzzle.difficulty === difficulty)
}

export function isPuzzleAvailable(id, currentFogLevel) {
  const puzzle = getPuzzle(id)
  if (!puzzle) return false
  return (
    currentFogLevel >= puzzle.fogImpact.min &&
    currentFogLevel <= puzzle.fogImpact.max
  )
}

export function getTotalPuzzles() {
  return puzzles.length
}

export { PuzzleType, DifficultyLevel }
