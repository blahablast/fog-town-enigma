'use client'
import { useSelector } from 'react-redux'
import { BOARD_WIDTH, BOARD_HEIGHT } from '@/constants/tetris'
import Cell from './Cell'

const Board = () => {
  const board = useSelector((state) => state.game.board)
  const currentPiece = useSelector((state) => state.game.currentPiece)
  const currentPosition = useSelector((state) => state.game.currentPosition)

  const getDisplayBoard = () => {
    const displayBoard = board.map((row) => [...row])

    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = currentPosition.y + y
            const boardX = currentPosition.x + x
            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH
            ) {
              displayBoard[boardY][boardX] = currentPiece.color
            }
          }
        })
      })
    }

    return displayBoard
  }

  return (
    <div className="board-grid">
      {getDisplayBoard().map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <Cell key={`${y}-${x}`} color={cell} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
