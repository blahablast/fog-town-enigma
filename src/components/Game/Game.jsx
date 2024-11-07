'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { completePuzzleAsync } from '../../store/slices/gameSlice'
import {
  selectFogLevel,
  selectCurrentFogEffect
} from '../../store/slices/fogSlice'
import { getPuzzle } from '../../lib/puzzles'
import styles from './Game.module.css'

export default function Game() {
  const [userAnswer, setUserAnswer] = useState('')
  const dispatch = useDispatch()

  // Redux selectors
  const fogLevel = useSelector(selectFogLevel)
  const currentPuzzleId = useSelector((state) => state.game.currentPuzzleId)
  const currentFogEffect = useSelector(selectCurrentFogEffect)

  // Fetch current puzzle details
  const currentPuzzle = getPuzzle(currentPuzzleId)

  const handleSubmitAnswer = async (e) => {
    e.preventDefault()
    const result = await dispatch(
      completePuzzleAsync({
        puzzleId: currentPuzzleId,
        answer: userAnswer,
        hintsUsed: false
      })
    ).unwrap()

    if (result.success) {
      setUserAnswer('') // Clear input on success
    } else {
      alert(result.error) // Show error message
    }
  }

  if (!currentPuzzle) return <div>Loading puzzle...</div>

  return (
    <div
      className={`p-6 ${currentFogEffect.visibility} ${styles.gameContainer}`}
    >
      <h1 className="text-2xl font-bold text-center mb-4">Fog Town Enigma</h1>
      <div className="text-center mb-6">
        <span className="text-gray-600">Fog Level: </span>
        <span className="font-semibold">{fogLevel}%</span>
      </div>
      <div className={`mb-6 ${styles.puzzleContainer}`}>
        <h2 className="text-xl font-semibold mb-2">Puzzle {currentPuzzleId}</h2>
        <p className="text-gray-700 mb-4">{currentPuzzle.question}</p>
        <form onSubmit={handleSubmitAnswer}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your Answer"
            className="border border-gray-300 p-2 rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
