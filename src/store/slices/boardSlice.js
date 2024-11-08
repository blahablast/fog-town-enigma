import { createSlice } from '@reduxjs/toolkit'
import {
  generatePiece,
  movePiece,
  rotatePiece,
  checkCollision,
  clearLines
} from '@/lib/tetrisUtils'

const initialState = {
  board: Array(20).fill(Array(10).fill(null)), // 20 rows x 10 columns grid
  currentPiece: generatePiece(), // Start with a new random piece
  piecePosition: { x: 4, y: 0 }, // Starting position
  score: 0
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    startNewPiece: (state) => {
      const newPiece = generatePiece()
      state.currentPiece = newPiece
      state.piecePosition = { x: 4, y: 0 } // Reset piece position to the top middle
    },

    movePiece: (state, action) => {
      const direction = action.payload
      const newPosition = movePiece(state.currentPiece, direction)

      if (!checkCollision(state.board, state.currentPiece, newPosition)) {
        state.piecePosition = newPosition
      }
    },

    rotatePiece: (state) => {
      const rotatedPiece = rotatePiece(state.currentPiece)
      if (!checkCollision(state.board, state.currentPiece, newPosition)) {
        state.currentPiece = rotatedPiece
      }
    },

    dropPiece: (state) => {
      const newPosition = movePiece(state.currentPiece, 'down')

      if (!checkCollision(state.board, state.currentPiece, newPosition)) {
        state.piecePosition = newPosition
      } else {
        // Place piece on the board and check for line clears
        state.board = placePieceOnBoard(
          state.board,
          state.currentPiece,
          state.piecePosition
        )

        // Clear lines if any are completed and update score
        const { cleardLines, newBoard } = clearLines(state.board)
        state.board = newBoard
        state.score += clearLines * 100

        // Start a new piece
        state.currentPiece = generatePiece()
        state.piecePosition = { x: 4, y: 0 }
      }
    },

    resetBoard: () => initialState
  }
})

function placePieceOnBoard(board, piece, position) {
  const newBoard = board.map((row) => [...row])

  piece.shape[piece.rotation].forEach(([dx, dy]) => {
    const x = position.x + dx
    const y = position.y + dy
    if (y >= 0) newBoard[y][x] = piece.type
  })

  return newBoard
}

// Export Actions
export const { startNewPiece, movePiece, rotatePiece, dropPiece, resetBoard } =
  boardSlice.actions

export default boardSlice.reducer
