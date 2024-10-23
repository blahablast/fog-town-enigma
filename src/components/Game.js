'use client'

import { useState, useEffect } from 'react'
import { getPuzzle, checkAnswer, getTotalPuzzles } from '../lib/puzzles'

export default function Game() {
  const [currentPuzzleId, setCurrentPuzzleId] = useState(1)
  const [puzzle, setPuzzle] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [fogLevel, setFogLevel] = useState(50)

  useEffect(() => {
    setPuzzle(getPuzzle(currentPuzzleId))
  }, [currentPuzzleId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (checkAnswer(currentPuzzleId, userAnswer)) {
      setMessage('Correct! Moving to next puzzle...')
      setFogLevel((prevFog) =>
        Math.max(0, Math.min(100, prevFog + puzzle.fogImpact))
      )
      if (currentPuzzleId < getTotalPuzzles()) {
        setTimeout(() => {
          setCurrentPuzzleId((prevId) => prevId + 1)
          setUserAnswer('')
          setMessage('')
        }, 2000)
      } else {
        setMessage("Congratulations! You've completed all puzzles!")
      }
    } else {
      setMessage('Incorrect. Try again.')
    }
  }

  if (!puzzle) return <div>Loading...</div>

  return (
    <div className="game-container">
      <h1>Fog Town Enigma</h1>
      <div className="fog-level">Fog Level: {fogLevel}%</div>
      <div className="puzzle-container">
        <h2>Puzzle {currentPuzzleId}</h2>
        <p>{puzzle.question}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer"
          />
          <button type="submit">Submit</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  )
}
