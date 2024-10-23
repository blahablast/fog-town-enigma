'use client'

import { useState, useEffect } from 'react'
import { getPuzzle, checkAnswer, isPuzzleAvailable } from '../lib/puzzles'
import { FOG_LEVELS, GAME_SETTINGS, FOG_EFFECTS } from '../lib/constants'

export default function Game() {
  const [currentPuzzleId, setCurrentPuzzleId] = useState(1)
  const [puzzle, setPuzzle] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [fogLevel, setFogLevel] = useState(FOG_LEVELS.DEFAULT)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    loadPuzzle(currentPuzzleId)
  }, [currentPuzzleId])

  const loadPuzzle = (id) => {
    const newPuzzle = getPuzzle(id)
    if (newPuzzle && isPuzzleAvailable(id, fogLevel)) {
      setPuzzle(newPuzzle)
      setAttempts(0)
      setShowHint(false)
    } else {
      setMessage('This puzzle is not available at current fog level')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!puzzle) return

    if (checkAnswer(currentPuzzleId, userAnswer)) {
      handleCorrectAnswer()
    } else {
      handleIncorrectAnswer()
    }
  }

  const handleCorrectAnswer = () => {
    // Calculate score based on attempts and hint usage
    const attemptBonus =
      attempts === 0
        ? REWARDS.PERFECT_SOLVE
        : attempts < GAME_SETTINGS.MAX_ATTEMPTS
        ? REWARDS.WITH_HINT
        : 0
    const newScore = score + attemptBonus
    setScore(newScore)

    // Update fog level based on puzzle impact
    const newFogLevel = Math.max(
      FOG_LEVELS.MIN,
      Math.min(FOG_LEVELS.MAX, fogLevel + puzzle.fogImpact.change)
    )
    setFogLevel(newFogLevel)

    // Show success message and puzzle reward
    setMessage(
      `Correct! You found: ${puzzle.reward.item} - ${puzzle.reward.description}`
    )

    // Proceed to next puzzle after delay
    setTimeout(() => {
      setCurrentPuzzleId((prev) => prev + 1)
      setUserAnswer('')
      setMessage('')
    }, 3000)
  }

  const handleIncorrectAnswer = () => {
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (newAttempts >= GAME_SETTINGS.MAX_ATTEMPTS) {
      setMessage('Too many attempts. Fog is getting denser...')
      setFogLevel((prev) =>
        Math.min(FOG_LEVELS.MAX, prev + GAME_SETTINGS.HINT_COST)
      )
    } else {
      setMessage(
        `Incorrect. ${
          GAME_SETTINGS.MAX_ATTEMPTS - newAttempts
        } attempts remaining.`
      )
    }
  }

  const handleHintRequest = () => {
    setShowHint(true)
    setFogLevel((prev) =>
      Math.min(FOG_LEVELS.MAX, prev + GAME_SETTINGS.HINT_COST)
    )
  }

  // Get current fog effect
  const getCurrentFogEffect = () => {
    return Object.values(FOG_EFFECTS).find(
      (effect) => fogLevel >= effect.min && fogLevel <= effect.max
    )
  }

  if (!puzzle) return <div className="text-center p-4">Loading puzzle...</div>

  return (
    <div className={`game-container p-6 ${getCurrentFogEffect()?.visibility}`}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Fog Town Enigma</h1>
        <div className="text-lg">Fog Level: {fogLevel}%</div>
        <div className="text-lg">Score: {score}</div>
      </div>

      <div className="puzzle-container bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Puzzle {currentPuzzleId}</h2>
        <p className="mb-4">{puzzle.question}</p>

        {showHint && (
          <div className="hint-box bg-gray-700 p-3 rounded mb-4">
            Hint: {puzzle.hint}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Submit Answer
            </button>
            {!showHint && (
              <button
                type="button"
                onClick={handleHintRequest}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Request Hint
              </button>
            )}
          </div>
        </form>

        {message && (
          <div className="message-box mt-4 p-3 rounded bg-gray-700">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
