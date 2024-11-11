import { BOARD_HEIGHT, BOARD_WIDTH, TETROMINOES } from '@/constants/tetris'

export const createEmptyBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  )

export const canMove = (board, shape, position) => {
  if (!shape) return false

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = position.x + x
        const newY = position.y + y

        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX])
        ) {
          return false
        }
      }
    }
  }
  return true
}

export const rotateMatrix = (matrix) => {
  const rotated = matrix[0].map((_, index) =>
    matrix.map((row) => row[index]).reverse()
  )
  return rotated
}

export const calculateScore = (lines, level) => {
  const basePoints = [0, 40, 100, 300, 1200]
  return basePoints[lines] * level
}
