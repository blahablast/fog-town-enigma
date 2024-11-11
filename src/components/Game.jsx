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
  }, [dispatch])

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!gameOver) {
        dispatch(moveDown())
      }
    }, TICK_SPEED)

    return () => clearInterval(gameLoop)
  }, [gameOver, dispatch])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold mb-4 text-blue-400">TETRIS</h1>
      <p className="text-2xl text-blue-400 mb-8">Score: {score}</p>

      <div className="border-4 border-gray-700 p-1 bg-gray-800">
        <Board />
      </div>

      {gameOver && (
        <div className="text-center mt-8">
          <p className="text-3xl font-bold text-red-500 mb-4">Game Over!</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg text-xl font-bold transition-all"
            onClick={() => dispatch(startGame())}
          >
            New Game
          </button>
        </div>
      )}

      {!gameOver && (
        <div className="text-center mt-4 text-gray-400">
          <p>Use arrow keys to move and rotate</p>
        </div>
      )}
    </div>
  )
}

export default Game
