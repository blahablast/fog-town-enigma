'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  movePiece,
  rotatePiece,
  dropPiece,
  startNewPiece,
  hardDrop
} from '@/store/slices/boardSlice'
import styles from './Game.module.css'

export default function Game() {
  const dispatch = useDispatch()

  // Access board and piece information and Redux store
  const board = useSelector((state) => state.board.board)
  const currentPiece = useSelector((state) => state.board.currentPiece)
  const piecePosition = useSelector((state) => state.board.piecePosition)

  // Keydown event listener to handle piece controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        console.log('Dispatching movePiece left')
        dispatch(movePiece('left'))
      }
      if (e.key === 'ArrowRight') {
        console.log('Dispatching movePiece right')
        dispatch(movePiece('right'))
      }
      if (e.key === 'ArrowDown') {
        console.log('Dispatching dropPiece')
        dispatch(dropPiece())
      }
      if (e.key === 'ArrowUp') {
        console.log('Dispatching rotatePiece')
        dispatch(hardDrop())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch])

  // Function to render the current board including the falling pieces
  const renderBoard = () => {
    // Create a copy of the board to overlay the current piece
    const boardWithPiece = board.map((row) => [...row])

    // Place the current piece into the board
    currentPiece.shape[currentPiece.rotation].forEach(([dx, dy]) => {
      const x = piecePosition.x + dx
      const y = piecePosition.y + dy
      if (y >= 0 && y < board.length && x >= 0 && x < board[0].length) {
        boardWithPiece[y][x] = currentPiece.type
      }
    })

    return boardWithPiece.map((row, rowIndex) => (
      <div key={rowIndex} className={styles.row}>
        {row.map((cell, cellIndex) => (
          <div
            key={cellIndex}
            className={`${styles.cell} ${cell ? styles[cell] : ''}`} // Apply piece style if cell is occupied
          />
        ))}
      </div>
    ))
  }

  return (
    <div className={styles.gameContainer}>
      <h1>Tetris</h1>
      <div className={styles.board}>{renderBoard()}</div>
    </div>
  )
}
