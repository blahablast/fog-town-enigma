'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  moveLeft,
  moveRight,
  moveDown,
  rotate,
  startGame
} from '@/store/gameSlice'
import { TICK_SPEED } from '@/constants/tetris'
import Board from './Board'

const Game = () => {
  const dispatch = useDispatch()
  const gameOver = useSelector((state) => state.game.gameOver)
  const score = useSelector((state) => state.game.score)

  useEffect(() => {
    console.log('Starting game')
    dispatch(startGame())
  }, [dispatch])

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          dispatch(moveLeft())
          break
        case 'ArrowRight':
          dispatch(moveRight())
          break
        case 'ArrowDown':
          dispatch(moveDown())
          break
        case 'ArrowUp':
          dispatch(rotate())
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!gameOver) {
        dispatch(moveDown())
      }
    }, TICK_SPEED)

    return () => clearInterval(gameLoop)
  }, [gameOver])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="space-y-4">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold mb-2">Tetris</h1>
          <p className="text-xl">Score: {score}</p>
        </div>
        <div className="border-4 border-gray-700 p-1 bg-gray-800">
          <Board />
        </div>
        {gameOver && (
          <div className="text-center">
            <p className="text-xl mb-4">Game Over!</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
              onClick={() => dispatch(startGame())}
            >
              New Game
            </button>
          </div>
        )}
        {!gameOver && (
          <div className="text-center text-sm text-gray-400">
            <p>Use arrow keys to move and rotate</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Game
