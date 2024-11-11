import { createSlice } from '@reduxjs/toolkit'
import {
  createEmptyBoard,
  canMove,
  rotateMatrix,
  calculateScore
} from '@/utils/gameUtils'
import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINOES } from '@/constants/tetris'

const mergePiece = (state) => {
  const { currentPiece, currentPosition, board } = state
  if (!currentPiece) return

  for (let y = 0; y < currentPiece.shape.length; y++) {
    for (let x = 0; x < currentPiece.shape[y].length; x++) {
      if (currentPiece.shape[y][x]) {
        const boardY = currentPosition.y + y
        const boardX = currentPosition.x + x
        if (boardY >= 0) {
          board[boardY][boardX] = currentPiece.color
        }
      }
    }
  }
}

const clearLines = (state) => {
  let linesCleared = 0
  const newBoard = state.board.filter((row) => {
    const isComplete = row.every((cell) => cell !== null)
    if (isComplete) linesCleared++
    return !isComplete
  })

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null))
  }

  state.board = newBoard
  return linesCleared
}

const spawnNewPiece = (state) => {
  const pieces = Object.keys(TETROMINOES)
  const newPiece =
    TETROMINOES[pieces[Math.floor(Math.random() * pieces.length)]]
  state.currentPiece = {
    shape: [...newPiece.shape],
    color: newPiece.color
  }
  state.currentPosition = {
    x: Math.floor((BOARD_WIDTH - newPiece.shape[0].length) / 2),
    y: -newPiece.shape.length
  }

  if (!canMove(state.board, state.currentPiece.shape, state.currentPosition)) {
    state.gameOver = true
  }
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    board: createEmptyBoard(),
    currentPiece: null,
    currentPosition: { x: 0, y: 0 },
    gameOver: false,
    score: 0,
    level: 1
  },
  reducers: {
    moveLeft: (state) => {
      if (
        !state.gameOver &&
        canMove(state.board, state.currentPiece?.shape, {
          ...state.currentPosition,
          x: state.currentPosition.x - 1
        })
      ) {
        state.currentPosition.x -= 1
      }
    },
    moveRight: (state) => {
      if (
        !state.gameOver &&
        canMove(state.board, state.currentPiece?.shape, {
          ...state.currentPosition,
          x: state.currentPosition.x + 1
        })
      ) {
        state.currentPosition.x += 1
      }
    },
    moveDown: (state) => {
      console.log('Moving down, current position:', state.currentPosition)
      if (!state.gameOver) {
        if (
          canMove(state.board, state.currentPiece?.shape, {
            ...state.currentPosition,
            y: state.currentPosition.y + 1
          })
        ) {
          state.currentPosition.y += 1
        } else {
          mergePiece(state)
          const clearedLines = clearLines(state)
          state.score += calculateScore(clearedLines, state.level)
          spawnNewPiece(state)
        }
      }
    },
    rotate: (state) => {
      if (!state.gameOver && state.currentPiece) {
        const rotatedShape = rotateMatrix(state.currentPiece.shape)
        if (canMove(state.board, rotatedShape, state.currentPosition)) {
          state.currentPiece.shape = rotatedShape
        }
      }
    },
    startGame: (state) => {
      state.board = createEmptyBoard()
      state.gameOver = false
      state.score = 0
      state.level = 1
      spawnNewPiece(state)
      console.log(
        'game started, initial state:',
        JSON.stringify(state, null, 2)
      )
    }
  }
})

export const { moveLeft, moveRight, moveDown, rotate, startGame } =
  gameSlice.actions
export default gameSlice.reducer
