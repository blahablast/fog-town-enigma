// This contains the core Tetris logic, puzzle piece generation, movement, and collison detection

import { PIECES } from './tetrisPieces'

// Function to generate a random Tetris piece
export function generatePiece() {
  const pieceTypes = Object.keys(PIECES)
  const type = pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
  const shape = PIECES[type]
  const rotation = 0 // Starts at default rotation

  return { type, shape, rotation, position: { x: 4, y: 0 } } // Start at the top middle of the board
}

// Function to rotate a piece (clockwise or counter-clockwise)
export function rotatePiece(piece, direction = 1) {
  const newRotation =
    (piece.rotation + direction + piece.shape.length) % piece.shape.length
  return { ...piece, rotation: newRotation }
}

// Check for collisons with the board edges or other pieces
export function checkCollision(board, piece, position) {
  const { shape, rotation } = piece
  for (let i = 0; i < shape[rotation].length; i++) {
    const [dx, dy] = shape[rotation][i]
    const x = position.x + dx
    const y = position.y + dy

    // Check boundaries and filled cells
    if (
      y >= board.length ||
      x < 0 ||
      x >= board[0].length ||
      (y >= 0 && board[y][x] !== null)
    ) {
      return true
    }
  }
  return false
}

// Clear completed lines and return updated board and score increment
export function clearLines(board) {
  const newBoard = board.filter((row) => row.some((cell) => cell === null))
  const clearedLines = board.length - newBoard.length

  // Add empty rows at the top for each cleared line
  for (let i = 0; i < clearLines; i++) {
    newBoard.unshift(Array(board[0].length).fill(null))
  }

  return { clearLines, newBoard }
}

// Move a piece on the board (e.g., down, left, or right)
export function movePiece(piece, direction) {
  const newPosition = { ...piece, direction }
  if (direction === 'left') newPosition.x -= 1
  if (direction === 'right') newPosition.x += 1
  if (direction === 'down') newPosition.y += 1
  return newPosition
}

// Drop a piece down by one row
export function dropPiece(piece) {
  return movePiece(piece, 'down')
}
